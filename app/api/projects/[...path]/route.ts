import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const PROJECTS_DIR = path.join(process.cwd(), 'Website Project Pages');

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path: pathSegments } = await params;

    // Clean query parameters from the last segment if they exist
    if (pathSegments.length > 0) {
        const lastSegment = pathSegments[pathSegments.length - 1];
        if (lastSegment.includes('?')) {
            pathSegments[pathSegments.length - 1] = lastSegment.split('?')[0];
        }
    }

    const filePath = path.join(PROJECTS_DIR, ...pathSegments);

    // Security check: ensure the path is within PROJECTS_DIR
    if (!filePath.startsWith(PROJECTS_DIR)) {
        return new NextResponse('Forbidden', { status: 403 });
    }

    if (!fs.existsSync(filePath)) {
        return new NextResponse('Not Found', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();

    let contentType = 'image/jpeg';
    if (ext === '.png') contentType = 'image/png';
    if (ext === '.webp') contentType = 'image/webp';
    if (ext === '.gif') contentType = 'image/gif';
    if (ext === '.svg') contentType = 'image/svg+xml';

    return new NextResponse(fileBuffer, {
        headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    });
}
