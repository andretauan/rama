const countdown = () => {
    var e = new Date(data_count).getTime() - (new Date).getTime(),
        n = 36e5,
        t = Math.floor(e / 864e5),
        o = Math.floor(e % 864e5 / n),
        n = Math.floor(e % n / 6e4),
        r = Math.floor(e % 6e4 / 1e3);
    document.querySelector(".day").innerText = t, document.querySelector(".hour").innerText = o, document.querySelector(".minute").innerText = n, document.querySelector(".second").innerText = r, e <= 0 && (clearInterval(watchCountdown), document.querySelector(".day").innerHTML = "0", document.querySelector(".hour").innerHTML = "0", document.querySelector(".minute").innerHTML = "0", document.querySelector(".second").innerHTML = "0")
};
let watchCountdown = setInterval(countdown, 1e3);