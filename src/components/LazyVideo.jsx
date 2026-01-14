import React, { useRef, useEffect, useState } from 'react';

const LazyVideo = ({ src, poster, className, ...props }) => {
    const videoRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect();
                    }
                });
            },
            {
                threshold: 0.1, // Trigger when 10% of the video is visible
                rootMargin: '50px', // Start loading slightly before it comes into view
            }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    return (
        <video
            ref={videoRef}
            className={className}
            poster={poster}
            preload="none"
            {...props}
        >
            {isVisible && <source src={src} type="video/mp4" />}
        </video>
    );
};

export default LazyVideo;
