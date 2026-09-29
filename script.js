/* =====================================================
   LUCAPRINT
   FRONTEND-ONLY BROWSER INTELLIGENCE
===================================================== */


/* ================= MENU ================= */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("show");

    menuToggle.textContent =
        navMenu.classList.contains("show")
            ? "✕"
            : "☰";

});


document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("show");

        menuToggle.textContent = "☰";

    });

});



/* ================= OPERATING SYSTEM ================= */

function getOS() {

    const ua = navigator.userAgent;

    if (/Windows NT/i.test(ua))
        return "Windows";

    if (/Android/i.test(ua))
        return "Android";

    if (/iPhone|iPad|iPod/i.test(ua))
        return "iOS";

    if (/Mac OS X/i.test(ua))
        return "macOS";

    if (/Linux/i.test(ua))
        return "Linux";

    return "Unknown";

}

document.getElementById("os").textContent =
    getOS();



/* ================= BROWSER ================= */

function getBrowser() {

    const ua = navigator.userAgent;

    if (ua.includes("Edg/"))
        return "Microsoft Edge";

    if (ua.includes("OPR/"))
        return "Opera";

    if (ua.includes("Firefox/"))
        return "Firefox";

    if (
        ua.includes("Chrome/") &&
        !ua.includes("Edg/")
    )
        return "Google Chrome";

    if (
        ua.includes("Safari/") &&
        !ua.includes("Chrome/")
    )
        return "Safari";

    return "Unknown";

}

document.getElementById("browser").textContent =
    getBrowser();

document.getElementById("activityBrowser").textContent =
    getBrowser();



/* ================= LANGUAGE ================= */

const language =
    navigator.language || "Unknown";

document.getElementById("language").textContent =
    language;



/* ================= TIMEZONE ================= */

const timezone =
    Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone || "Unknown";

document.getElementById("timezone").textContent =
    timezone;



/* ================= SCREEN ================= */

const screenInfo =
    `${screen.width} × ${screen.height}`;

document.getElementById("screen").textContent =
    screenInfo;

document.getElementById("colorDepth").textContent =
    `${screen.colorDepth}-bit`;

document.getElementById("activityScreen").textContent =
    `${screenInfo} / ${screen.colorDepth}-bit`;



/* ================= DEVICE ================= */

function getDevice() {

    if (window.innerWidth <= 600)
        return "Mobile";

    if (window.innerWidth <= 1000)
        return "Tablet";

    return "Desktop";

}

document.getElementById("device").textContent =
    getDevice();



/* ================= CPU ================= */

const cores =
    navigator.hardwareConcurrency;

document.getElementById("cpu").textContent =
    cores
        ? `${cores} cores`
        : "Unavailable";

document.getElementById("cores").textContent =
    cores
        ? `${cores} logical cores`
        : "Unavailable";



/* ================= MEMORY ================= */

const memory =
    navigator.deviceMemory;

document.getElementById("memory").textContent =
    memory
        ? `${memory} GB`
        : "Unavailable";



/* ================= PLATFORM ================= */

document.getElementById("platform").textContent =
    navigator.platform ||
    "Unavailable";



/* ================= USER AGENT ================= */

document.getElementById("userAgent").textContent =
    navigator.userAgent;



/* ================= NETWORK ================= */

function getNetwork() {

    const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;

    if (!connection) {

        document.getElementById("network").textContent =
            "Available after permission/API request";

        document.getElementById("networkSpeed").textContent =
            "Unavailable";

        return;

    }

    const type =
        connection.effectiveType ||
        "Unknown";

    document.getElementById("network").textContent =
        type;

    document.getElementById("networkSpeed").textContent =
        connection.downlink
            ? `${connection.downlink} Mbps`
            : "API";

    document.getElementById("activityNetwork").textContent =
        `${type}${connection.downlink
            ? " / " + connection.downlink + " Mbps"
            : ""}`;

}

getNetwork();



/* ================= BATTERY ================= */

async function getBattery() {

    const batteryElement =
        document.getElementById("battery");

    if (!navigator.getBattery) {

        batteryElement.textContent =
            "Available after permission/API request";

        document.getElementById(
            "activityBattery"
        ).textContent =
            "Battery API unavailable";

        return;

    }

    try {

        const battery =
            await navigator.getBattery();

        function updateBattery() {

            const level =
                Math.round(
                    battery.level * 100
                );

            batteryElement.textContent =
                `${level}%`;

            document.getElementById(
                "batteryPercent"
            ).textContent =
                battery.charging
                    ? "Charging"
                    : `${level}%`;

            document.getElementById(
                "batteryBar"
            ).style.width =
                `${level}%`;

            document.getElementById(
                "activityBattery"
            ).textContent =
                battery.charging
                    ? `${level}% / Charging`
                    : `${level}% / Not charging`;

        }

        updateBattery();

        battery.addEventListener(
            "levelchange",
            updateBattery
        );

        battery.addEventListener(
            "chargingchange",
            updateBattery
        );

    } catch {

        batteryElement.textContent =
            "Unavailable";

    }

}

getBattery();



/* ================= TOUCH ================= */

const touches =
    navigator.maxTouchPoints || 0;

document.getElementById("touch").textContent =
    touches > 0
        ? `${touches} point(s)`
        : "Not detected";



/* ================= WEBGL ================= */

function getWebGL() {

    const canvas =
        document.createElement("canvas");

    const gl =
        canvas.getContext("webgl") ||
        canvas.getContext(
            "experimental-webgl"
        );

    if (!gl)
        return "Unavailable";

    return "Available";

}

document.getElementById("webgl").textContent =
    getWebGL();

document.getElementById("activityGraphics").textContent =
    `Canvas: ${document.getElementById("canvas").textContent}
     / WebGL: ${getWebGL()}`;



/* ================= CANVAS ================= */

function getCanvas() {

    const canvas =
        document.createElement("canvas");

    const context =
        canvas.getContext("2d");

    return context
        ? "Supported"
        : "Unavailable";

}

document.getElementById("canvas").textContent =
    getCanvas();



/* ================= COOKIES ================= */

document.getElementById("cookies").textContent =
    navigator.cookieEnabled
        ? "Enabled"
        : "Disabled";



/* ================= LOCAL STORAGE ================= */

function checkStorage() {

    try {

        localStorage.setItem(
            "__luca_test",
            "1"
        );

        localStorage.removeItem(
            "__luca_test"
        );

        return "Available";

    } catch {

        return "Unavailable";

    }

}

document.getElementById("storage").textContent =
    checkStorage();



/* ================= ONLINE ================= */

function updateOnline() {

    const status =
        navigator.onLine
            ? "Online"
            : "Offline";

    document.getElementById("online").textContent =
        status;

}

updateOnline();

window.addEventListener(
    "online",
    updateOnline
);

window.addEventListener(
    "offline",
    updateOnline
);



/* ================= PIXEL RATIO ================= */

document.getElementById("pixelRatio").textContent =
    `${window.devicePixelRatio || 1}x`;



/* ================= DO NOT TRACK ================= */

const dnt =
    navigator.doNotTrack;

document.getElementById("dnt").textContent =
    dnt === "1"
        ? "Enabled"
        : dnt === "0"
            ? "Disabled"
            : "Not specified";



/* ================= PDF ================= */

document.getElementById("pdf").textContent =
    navigator.pdfViewerEnabled !== undefined
        ? navigator.pdfViewerEnabled
            ? "Supported"
            : "Unavailable"
        : "Browser API unavailable";



/* ================= PLUGINS ================= */

document.getElementById("plugins").textContent =
    navigator.plugins
        ? `${navigator.plugins.length} detected`
        : "Unavailable";



/* ================= FINGERPRINT ID ================= */

async function generateFingerprint() {

    const values = [

        navigator.userAgent,

        navigator.language,

        navigator.platform,

        navigator.hardwareConcurrency || "",

        navigator.deviceMemory || "",

        screen.width,

        screen.height,

        screen.colorDepth,

        window.devicePixelRatio,

        navigator.maxTouchPoints,

        Intl.DateTimeFormat()
            .resolvedOptions()
            .timeZone,

        navigator.cookieEnabled,

        navigator.onLine

    ].join("|");


    if (
        window.crypto &&
        crypto.subtle
    ) {

        const encoded =
            new TextEncoder()
                .encode(values);

        const hash =
            await crypto.subtle.digest(
                "LUC-256",
                encoded
            );

        const bytes =
            Array.from(
                new Uint8Array(hash)
            );

        return bytes
            .map(
                byte =>
                    byte
                        .toString(16)
                        .padStart(2, "0")
            )
            .join("")
            .substring(0, 24);

    }


    let result = 0;

    for (
        let i = 0;
        i < values.length;
        i++
    ) {

        result =
            ((result << 5) -
                result) +
            values.charCodeAt(i);

        result |= 0;

    }

    return Math.abs(result)
        .toString(16)
        .padStart(12, "0");

}


async function showFingerprint() {

    const element =
        document.getElementById(
            "fingerprintId"
        );

    try {

        const id =
            await generateFingerprint();

        element.textContent =
            `SP-${id.toUpperCase()}`;

    } catch {

        element.textContent =
            "SP-DEMO-" +
            Math.random()
                .toString(36)
                .substring(2, 14)
                .toUpperCase();

    }

}

showFingerprint();



/* ================= COPY ================= */

document
    .getElementById("copyId")
    .addEventListener(
        "click",
        async () => {

            const id =
                document.getElementById(
                    "fingerprintId"
                ).textContent;

            try {

                await navigator.clipboard.writeText(
                    id
                );

                const button =
                    document.getElementById(
                        "copyId"
                    );

                button.textContent =
                    "COPIED";

                setTimeout(() => {

                    button.textContent =
                        "COPY";

                }, 1500);

            } catch {

                alert(
                    "Copy is not available."
                );

            }

        }
    );



/* ================= SEARCH ================= */

document
    .getElementById("searchCards")
    .addEventListener(
        "input",
        function () {

            const search =
                this.value.toLowerCase();

            document
                .querySelectorAll(".finger-card")
                .forEach(card => {

                    const text =
                        card.textContent
                            .toLowerCase();

                    card.style.display =
                        text.includes(search)
                            ? ""
                            : "none";

                });

        }
    );



/* ================= TIME TABS ================= */

document
    .querySelectorAll(".time-tab")
    .forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".time-tab")
                    .forEach(item =>
                        item.classList.remove(
                            "active"
                        )
                    );

                tab.classList.add("active");

            }
        );

    });



/* ================= REFRESH ================= */

document
    .getElementById("refreshButton")
    .addEventListener(
        "click",
        () => {

            location.reload();

        }
    );



/* ================= DOWNLOAD ================= */

document
    .getElementById("downloadReport")
    .addEventListener(
        "click",
        async () => {

            const report = {

                project:
                    "LucaPrint Browser Intelligence",

                fingerprintId:
                    document.getElementById(
                        "fingerprintId"
                    ).textContent,

                operatingSystem:
                    getOS(),

                browser:
                    getBrowser(),

                language:
                    navigator.language,

                timezone:
                    timezone,

                screen:
                    screenInfo,

                device:
                    getDevice(),

                cpuCores:
                    cores || "Unavailable",

                memory:
                    memory || "Unavailable",

                network:
                    document.getElementById(
                        "network"
                    ).textContent,

                cookies:
                    navigator.cookieEnabled,

                online:
                    navigator.onLine,

                colorDepth:
                    screen.colorDepth,

                pixelRatio:
                    window.devicePixelRatio,

                touchPoints:
                    touches,

                platform:
                    navigator.platform,

                userAgent:
                    navigator.userAgent,

                canvas:
                    getCanvas(),

                webgl:
                    getWebGL(),

                generatedAt:
                    new Date().toISOString()

            };


            const blob =
                new Blob(
                    [
                        JSON.stringify(
                            report,
                            null,
                            4
                        )
                    ],
                    {
                        type:
                            "application/json"
                    }
                );


            const url =
                URL.createObjectURL(blob);


            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                "lucaprint-report.json";

            document.body.appendChild(link);

            link.click();

            link.remove();

            URL.revokeObjectURL(url);

        }
    );



/* ================= MODAL ================= */

const modal =
    document.getElementById("modal");

const modalTitle =
    document.getElementById("modalTitle");

const modalText =
    document.getElementById("modalText");


function openModal(title, text) {

    modalTitle.textContent =
        title;

    modalText.textContent =
        text;

    modal.classList.add("show");

}


document
    .getElementById("closeModal")
    .addEventListener(
        "click",
        () => {

            modal.classList.remove(
                "show"
            );

        }
    );


modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {

            modal.classList.remove(
                "show"
            );

        }

    }
);



/* ================= TIMELINE ================= */

document
    .getElementById("timelineButton")
    .addEventListener(
        "click",
        () => {

            openModal(
                "Fingerprint Timeline",
                "This frontend-only version does not store fingerprint history on a server. The current browser session can be refreshed to collect the latest local information."
            );

        }
    );



/* ================= EXTENSION ================= */

document
    .getElementById("extensionButton")
    .addEventListener(
        "click",
        () => {

            openModal(
                "LucaPrint Extension",
                "This is a frontend demonstration of the ShadowPrint extension concept. No extension backend or external fingerprinting service is connected."
            );

        }
    );



/* ================= SURVEY ================= */

document
    .querySelectorAll(".survey-options button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document.getElementById(
                    "surveyResult"
                ).textContent =
                    `You selected "${button.textContent}". Thanks for your feedback.`;

            }
        );

    });



/* ================= THEME ================= */

document
    .getElementById("themeButton")
    .addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark"
            );

            localStorage.setItem(
                "lucaTheme",
                document.body.classList.contains(
                    "dark"
                )
                    ? "dark"
                    : "light"
            );

        }
    );


if (
    localStorage.getItem(
        "lucaTheme"
    ) === "dark"
) {

    document.body.classList.add(
        "dark"
    );

}



/* ================= LANGUAGE ================= */

document
    .getElementById("languageSelector")
    .addEventListener(
        "change",
        event => {

            openModal(
                "Language",
                `The selected interface language is ${event.target.value}. Full translation can be added later without changing the fingerprint system.`
            );

        }
    );



/* ================= RESIZE ================= */

window.addEventListener(
    "resize",
    () => {

        document.getElementById(
            "device"
        ).textContent =
            getDevice();

    }
);