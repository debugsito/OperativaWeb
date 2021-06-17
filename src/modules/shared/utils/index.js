const GENDER = [{ id: 1, name: "Masculino" }, { id: 2, name: "Femenino" }, { id: 3, name: "Otro" }]

export const getRubroById = (array, rubro_id) => {
    if (rubro_id === "") {
        return ""
    } else {
        const rubro = array.filter(item => item.id === rubro_id)
        return rubro[0]?.name
    }
}

export const getPeriodoById = (array, period_id) => {
    if (period_id === "") {
        return ""
    } else {
        const periodo = array.filter(item => item.id == period_id)
        return periodo[0]?.name
    }
}

export const getDistrictById = (array, district_id) => {
    if (!district_id || array.length == 0) {
        return ""
    } else {
        const distrtict = array.filter(item => item.id == district_id)
        return distrtict[0]?.name
    }
}

export const getNameById = (array = [], id) => {
    if (!id || array.length === 0) {
        return "DNI"
    } else {
        const rubro = array.filter(item => item.id === id)
        return rubro[0]?.name
    }
}

export const getGenderById = (gender_id) => {
    if (gender_id || gender_id === 0) {
        return "No específico"
    } else {
        const gender = GENDER.filter(item => item.id === gender_id)
        return gender[0]?.name
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