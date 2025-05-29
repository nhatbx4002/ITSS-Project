// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export async function middleware(req) {
//   const token = await getToken({ req });
//   const { pathname } = req.nextUrl;

//   if (!token) return NextResponse.redirect(new URL('/signin', req.url));

//   const role = token.role;

//   if (role === 'admin') {
//     // Admin có quyền truy cập tất cả
//     return NextResponse.next();
//   }
//   // Bảo vệ từng route
//   if (pathname.startsWith('/admin') && role !== 'admin') {
//     return NextResponse.redirect(new URL('/unauthorized', req.url));
//   }
  
//   if (pathname.startsWith('/staff') && role !== 'staff') {
//     return NextResponse.redirect(new URL('/unauthorized', req.url));
//   }
  
//   if (pathname.startsWith('/trainer') && role !== 'trainer') {
//     return NextResponse.redirect(new URL('/unauthorized', req.url));
//   }
  
//   if (pathname.startsWith('/member') && role !== 'member') {
//     return NextResponse.redirect(new URL('/unauthorized', req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/admin/:path*', '/staff/:path*', '/trainer/:path*', '/member/:path*'],
// }; 