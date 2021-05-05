export const localStorageKeys = {
    userDetails: 'userDetails',
    likeData: 'likeData',
    // Token:'Token',
};
export const imgUrl = 'https://s3-us-west-2.amazonaws.com/itabmenu/';
export const utils = {
    mediaUrl: (mediaFileNameOrUrl: string) => {
        if (mediaFileNameOrUrl) {
            return imgUrl + mediaFileNameOrUrl;
        } else {
            return '../assets/images/user.png';
        }
    },
    trimText: (text: string, charlength: number) => {
        if (text && text.length > charlength) {
            return text.substring(0, charlength - 4) + '...';
        } else {
            return text;
        }
    }
};
