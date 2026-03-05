export type CaptureFrameOptions = {
    quality?: number;
    fileName?: string;
    mirror?: boolean;
    maxWidth?: number;
    maxHeight?: number;
};

export type CaptureFrameResult = {
    file: File;
    width: number;
    height: number;
};

const getTargetSize = (
    sourceWidth: number,
    sourceHeight: number,
    maxWidth?: number,
    maxHeight?: number,
) => {
    let scale = 1;

    if (typeof maxWidth === 'number' && Number.isFinite(maxWidth) && maxWidth > 0) {
        scale = Math.min(scale, maxWidth / sourceWidth);
    }

    if (typeof maxHeight === 'number' && Number.isFinite(maxHeight) && maxHeight > 0) {
        scale = Math.min(scale, maxHeight / sourceHeight);
    }

    return {
        width: Math.max(1, Math.round(sourceWidth * scale)),
        height: Math.max(1, Math.round(sourceHeight * scale)),
    };
};

const canvasToJpegBlob = (canvas: HTMLCanvasElement, quality: number) =>
    new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    reject(new Error('캡처 이미지를 JPEG로 변환하지 못함'));
                    return;
                }
                resolve(blob);
            },
            'image/jpeg',
            quality,
        );
    });

export const captureFrame = async (
    video: HTMLVideoElement,
    options: CaptureFrameOptions = {},
): Promise<CaptureFrameResult> => {
    if (
        !video.videoWidth ||
        !video.videoHeight ||
        video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA
    ) {
        throw new Error('카메라 프레임이 아직 준비되지 않음');
    }

    const quality =
        typeof options.quality === 'number' && Number.isFinite(options.quality)
            ? Math.min(1, Math.max(0, options.quality))
            : 0.8;

    const sourceWidth = video.videoWidth;
    const sourceHeight = video.videoHeight;

    const { width, height } = getTargetSize(
        sourceWidth,
        sourceHeight,
        options.maxWidth,
        options.maxHeight,
    );

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('캔버스를 초기화하지 못함');
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    if (options.mirror) {
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, sourceWidth, sourceHeight, 0, 0, width, height);

    const blob = await canvasToJpegBlob(canvas, quality);
    const now = Date.now();

    const file = new File([blob], options.fileName ?? `capture-${now}.jpg`, {
        type: 'image/jpeg',
        lastModified: now,
    });

    return {
        file,
        width,
        height,
    };
};
