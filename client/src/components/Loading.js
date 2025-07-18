import React from 'react';

const Loading = ({ size = 'md', fullScreen = false }) => {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                <div className={`${sizes[size]} animate-spin rounded-full border-4 border-gray-200 dark:border-gray-700 border-t-blue-500`} />
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center p-4">
            <div className={`${sizes[size]} animate-spin rounded-full border-4 border-gray-200 dark:border-gray-700 border-t-blue-500`} />
        </div>
    );
};

export default Loading; 