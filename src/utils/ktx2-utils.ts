import type { WebGLRenderer } from 'three';
import type { GLTFLoader } from 'three-stdlib';
import { KTX2Loader } from 'three-stdlib';

export class KTX2Utils {
    private static readonly loader = new KTX2Loader().setTranscoderPath('/basis/');
    private static initialized = false;
    private static readonly preloadQueue: (() => void)[] = [];

    static init(gl: WebGLRenderer) {
        if (this.initialized) return;
        this.initialized = true;
        this.loader.detectSupport(gl);
        this.preloadQueue.forEach((fn) => fn());
        this.preloadQueue.length = 0;
    }

    static registerPreload(fn: () => void) {
        if (this.initialized) {
            fn();
        } else {
            this.preloadQueue.push(fn);
        }
    }

    static extendLoader(loader: GLTFLoader) {
        loader.setKTX2Loader(KTX2Utils.loader);
    }
}
