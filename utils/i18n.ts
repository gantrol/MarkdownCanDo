export const getI18nForVditor = () => {
    const currentPath = location.pathname;
    if (currentPath.startsWith('/zh')) {
        return 'zh_CN';
    }
        // else if (currentPath.startsWith('zh')) {
        //
    // }
    else {
        return 'en_US';
    }

}
