
export const getRubroById = (array, rubro_id) => {
    if (rubro_id === "") {
        return ""
    } else {
        const rubro = array.filter(item => item.id === rubro_id)
        return rubro[0]?.name
    }
}

export const convertStringToObject = (string) => {
    if (string[0] === "[") {
        return JSON.parse(string)
    } else {
        return [{ type: "paragraph", children: [{ text: string }] }]
    }
}

export function getOS() {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
    }

    return os;
}