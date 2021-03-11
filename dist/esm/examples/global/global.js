import "@Src/examples/polyfills/index";
import "./global.less";
// 注册 service worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js").then((registration) => {
            console.log("SW registered: ", registration);
        }).catch((registrationError) => {
            console.error("SW registration failed: ", registrationError);
        });
    });
}
else {
    console.error("serviceWorker not supported");
}
//# sourceMappingURL=global.js.map