const iconBtn = 'flex h-[48px] w-[48px] items-center justify-center rounded-full bg-black/30';

export const CameraHeader = () => {
    return (
        <div className="flex items-center justify-between">
            <button type="button" aria-label="닫기" className={iconBtn}>
                <svg
                    className="h-[14px] w-[14px]"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1.36111 13.6111L0 12.25L5.44444 6.80553L0 1.36108L1.36111 -2.76566e-05L6.80556 5.44442L12.25 -2.76566e-05L13.6111 1.36108L8.16667 6.80553L13.6111 12.25L12.25 13.6111L6.80556 8.16664L1.36111 13.6111Z"
                        fill="white"
                    />
                </svg>
            </button>
            <button type="button" aria-label="플래시" className={iconBtn}>
                <svg
                    className="h-[20px] w-[16px]"
                    viewBox="0 0 16 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6.36806 15.75L11.3993 9.72224H7.51042L8.21528 4.20487L3.71875 10.6945H7.09722L6.36806 15.75ZM3.88889 19.4445L4.86111 12.6389H0L8.75 1.33514e-05H10.6944L9.72222 7.77779H15.5556L5.83333 19.4445H3.88889Z"
                        fill="white"
                    />
                </svg>
            </button>
        </div>
    );
};
