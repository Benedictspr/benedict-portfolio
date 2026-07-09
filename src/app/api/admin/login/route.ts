import { NextResponse } from 'next/server';

// Simple in-memory storage for rate limiting: IP -> { attempts: number, lockoutUntil: number }
const loginAttempts = new Map<string, { attempts: number; lockoutUntil: number }>();

async function sha256(message: string) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    const now = Date.now();

    const clientRecord = loginAttempts.get(ip);
    if (clientRecord && clientRecord.lockoutUntil > now) {
      const remainingLockout = Math.ceil((clientRecord.lockoutUntil - now) / 1000);
      return NextResponse.json({
        success: false,
        message: `Too many login attempts. Locked out. Try again in ${remainingLockout} seconds.`
      }, { status: 429 });
    }

    const { username, pass } = await request.json();

    const expectedUser = process.env.ADMIN_USERNAME || 'Benedictspr';
    const expectedPass = process.env.ADMIN_PASSWORD || 'Benedictspr1#';

    const passHash = await sha256(pass);
    const expectedPassHash = expectedPass.length === 64 ? expectedPass : await sha256(expectedPass);

    const isUserMatch = username === expectedUser;
    const isPassMatch = passHash === expectedPassHash;

    if (isUserMatch && isPassMatch) {
      loginAttempts.delete(ip);
      return NextResponse.json({ success: true });
    } else {
      const attempts = (clientRecord?.attempts || 0) + 1;
      let lockoutUntil = 0;
      
      if (attempts >= 5) {
        lockoutUntil = now + 5 * 60 * 1000; // 5 minute lockout
      }

      loginAttempts.set(ip, { attempts, lockoutUntil });

      return NextResponse.json({
        success: false,
        message: attempts >= 5 
          ? 'Too many failed attempts. Locked out for 5 minutes.' 
          : `Invalid credentials. ${5 - attempts} attempts remaining.`
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Secure login error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
