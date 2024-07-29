import { NextResponse, NextRequest } from 'next/server';

// Middleware function
export async function middleware(req: NextRequest) {
    const start = Date.now();
  
    const response = NextResponse.next();
  
    response.headers.set('X-Request-Start', start.toString());
    response.headers.set('X-Logging', "true");


    return response;
  }
  

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // Also exclude typical file extensions including .png
    '/((?!_next/static|_next/image|favicon.ico|\\.js$|\\.css$|\\.json$|\\.png$|\\.jpg$|\\.jpeg$|\\.gif$|\\.svg$|\\.ico$|\\.webp$|\\.avif$|\\.woff$|\\.woff2$|\\.ttf$|\\.otf$|\\.eot$|\\.mp4$|\\.webm$|\\.ogg$|\\.mp3$|\\.wav$|\\.m4a$|\\.aac$|\\.oga$|\\.pdf$|\\.doc$|\\.docx$|\\.xls$|\\.xlsx$|\\.ppt$|\\.pptx$|\\.zip$|\\.tar$|\\.gz$|\\.rar$|\\.7z$).*)',
  ],
};
