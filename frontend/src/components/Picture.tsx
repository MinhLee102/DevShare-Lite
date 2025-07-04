import Image from 'next/image';

interface ImageInfo {
    url: string;
    width: number;
    height: number;
    alt?: string;
    className?: string;
}

const Picture = ({url, width, height, alt = 'Logo'}: ImageInfo) => {
    return <Image src={url} alt={alt} width={width} height={height} />;
};

export default Picture;