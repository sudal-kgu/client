import { useMutation } from '@tanstack/react-query';

import { uploadImage } from '../api/uploadImageApi';

export const useImageUpload = () => {
    return useMutation({
        mutationFn: uploadImage,
    });
};
