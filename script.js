import React from "https://esm.sh/react@18.2.0";
import ReactDOM from "https://esm.sh/react-dom@18.2.0";

const App = () => {
  const [timer, setTimer] = React.useState("25:00");
  const [downtime, setDowntime] = React.useState(5);
  const [session, setSession] = React.useState(25);
  const [mode, setMode] = React.useState(false);
  const [paused, setPaused] = React.useState(true);

  const timeConversion = mm => {
    const totalSeconds = Math.floor(mm / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const parseTime = time => {
    const [minutes, seconds] = time.split(":").map(Number);
    const totalSeconds = minutes * 60 + seconds;
    const newTotalSeconds = totalSeconds - 1;
    const newMinutes = Math.floor(newTotalSeconds / 60);
    const newSeconds = newTotalSeconds % 60;
    return `${newMinutes < 10 ? "0" : ""}${newMinutes}:${
    newSeconds < 10 ? "0" : ""
    }${newSeconds}`;
  };

  React.useEffect(() => {
    let interval;
    if (!paused) {
      interval = setInterval(() => {
        setTimer(timer => parseTime(timer));
        if (document.getElementById("time-left").innerHTML == "00:00") {
          setMode(mode => !mode);
          document.getElementById("beep").play();
          setTimer(
          !mode ?
          timeConversion(downtime * 60000) :
          timeConversion(session * 60000));

        }
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [paused, mode]);

  const handleReset = () => {
    setDowntime(5);
    setSession(25);
    setMode(false);
    setPaused(true);
    setTimer("25:00");
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
  };

  const handleTimer = () => {
    setTimer(
    mode ? timeConversion(downtime * 60000) : timeConversion(session * 60000));

  };

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("h1", null, "Pomodoro Timer"), /*#__PURE__*/
    React.createElement("div", { id: "length-adjustment" }, /*#__PURE__*/
    React.createElement(Session, {
      timer: timer,
      setSession: setSession,
      session: session,
      paused: paused,
      handleTimer: handleTimer }), /*#__PURE__*/

    React.createElement(Break, {
      downtime: downtime,
      setDowntime: setDowntime,
      paused: paused,
      handleTimer: handleTimer })), /*#__PURE__*/


    React.createElement("div", { id: "length-display" }, /*#__PURE__*/
    React.createElement("h2", { id: "timer-label" }, mode ? "Break" : "Session"), /*#__PURE__*/
    React.createElement("audio", {
      id: "beep",
      src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" }), /*#__PURE__*/

    React.createElement("p", { id: "time-left" }, timer), /*#__PURE__*/
    React.createElement("div", { class: "timerButtons" }, /*#__PURE__*/
    React.createElement("div", { id: "start_stop", onClick: () => setPaused(!paused) },
    paused ? /*#__PURE__*/
    React.createElement("svg", { viewBox: "0 0 512 512", width: "50", title: "play-circle" }, /*#__PURE__*/
    React.createElement("path", { d: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z" })) : /*#__PURE__*/


    React.createElement("svg", { viewBox: "0 0 512 512", width: "50", title: "pause-circle" }, /*#__PURE__*/
    React.createElement("path", { d: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm-16 328c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160zm112 0c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160z" }))), /*#__PURE__*/



    React.createElement("svg", {
      onClick: handleReset,
      id: "reset",
      viewBox: "0 0 512 512",
      width: "50",
      title: "recycle" }, /*#__PURE__*/

    React.createElement("path", { d: "M184.561 261.903c3.232 13.997-12.123 24.635-24.068 17.168l-40.736-25.455-50.867 81.402C55.606 356.273 70.96 384 96.012 384H148c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12H96.115c-75.334 0-121.302-83.048-81.408-146.88l50.822-81.388-40.725-25.448c-12.081-7.547-8.966-25.961 4.879-29.158l110.237-25.45c8.611-1.988 17.201 3.381 19.189 11.99l25.452 110.237zm98.561-182.915l41.289 66.076-40.74 25.457c-12.051 7.528-9 25.953 4.879 29.158l110.237 25.45c8.672 1.999 17.215-3.438 19.189-11.99l25.45-110.237c3.197-13.844-11.99-24.719-24.068-17.168l-40.687 25.424-41.263-66.082c-37.521-60.033-125.209-60.171-162.816 0l-17.963 28.766c-3.51 5.62-1.8 13.021 3.82 16.533l33.919 21.195c5.62 3.512 13.024 1.803 16.536-3.817l17.961-28.743c12.712-20.341 41.973-19.676 54.257-.022zM497.288 301.12l-27.515-44.065c-3.511-5.623-10.916-7.334-16.538-3.821l-33.861 21.159c-5.62 3.512-7.33 10.915-3.818 16.536l27.564 44.112c13.257 21.211-2.057 48.96-27.136 48.96H320V336.02c0-14.213-17.242-21.383-27.313-11.313l-80 79.981c-6.249 6.248-6.249 16.379 0 22.627l80 79.989C302.689 517.308 320 510.3 320 495.989V448h95.88c75.274 0 121.335-82.997 81.408-146.88z" }))))));





};

const Session = props => {
  React.useEffect(() => {
    props.handleTimer();
  }, [props.session]);

  return /*#__PURE__*/(
    React.createElement("div", { id: "session-container", class: "adjustmentBox" }, /*#__PURE__*/
    React.createElement("h2", { id: "session-label" }, "Session Length"), /*#__PURE__*/
    React.createElement("div", { class: "timerButtons" }, /*#__PURE__*/
    React.createElement("svg", {
      onClick: () => {
        if (props.paused) {
          props.setSession(
          props.session < 60 ? props.session + 1 : props.session);

        } else {
          props.setSession(props.session);
        }
      },
      id: "session-increment",
      viewBox: "0 0 512 512",
      width: "30",
      title: "arrow-circle-up" }, /*#__PURE__*/

    React.createElement("path", { d: "M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm143.6 28.9l72.4-75.5V392c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V209.4l72.4 75.5c9.3 9.7 24.8 9.9 34.3.4l10.9-11c9.4-9.4 9.4-24.6 0-33.9L273 107.7c-9.4-9.4-24.6-9.4-33.9 0L106.3 240.4c-9.4 9.4-9.4 24.6 0 33.9l10.9 11c9.6 9.5 25.1 9.3 34.4-.4z" })), /*#__PURE__*/

    React.createElement("p", { id: "session-length" }, props.session), /*#__PURE__*/
    React.createElement("svg", {
      onClick: () => {
        if (props.paused) {
          props.setSession(
          props.session > 1 ? props.session - 1 : props.session);

        } else {
          props.setSession(props.session);
        }
      },
      id: "session-decrement",
      viewBox: "0 0 512 512",
      width: "30",
      title: "arrow-circle-down" }, /*#__PURE__*/

    React.createElement("path", { d: "M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-143.6-28.9L288 302.6V120c0-13.3-10.7-24-24-24h-16c-13.3 0-24 10.7-24 24v182.6l-72.4-75.5c-9.3-9.7-24.8-9.9-34.3-.4l-10.9 11c-9.4 9.4-9.4 24.6 0 33.9L239 404.3c9.4 9.4 24.6 9.4 33.9 0l132.7-132.7c9.4-9.4 9.4-24.6 0-33.9l-10.9-11c-9.5-9.5-25-9.3-34.3.4z" })))));




};

const Break = props => {
  React.useEffect(() => {
    props.handleTimer();
  }, [props.downtime]);

  return /*#__PURE__*/(
    React.createElement("div", { id: "break-container", class: "adjustmentBox" }, /*#__PURE__*/
    React.createElement("h2", { id: "break-label" }, "Break Length"), /*#__PURE__*/
    React.createElement("div", { class: "timerButtons" }, /*#__PURE__*/
    React.createElement("svg", {
      onClick: () => {
        if (props.paused) {
          props.setDowntime(
          props.downtime < 60 ? props.downtime + 1 : props.downtime);

        } else {
          props.setDowntime(props.downtime);
        }
      },
      id: "break-increment",
      viewBox: "0 0 512 512",
      width: "30",
      title: "arrow-circle-up" }, /*#__PURE__*/

    React.createElement("path", { d: "M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm143.6 28.9l72.4-75.5V392c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V209.4l72.4 75.5c9.3 9.7 24.8 9.9 34.3.4l10.9-11c9.4-9.4 9.4-24.6 0-33.9L273 107.7c-9.4-9.4-24.6-9.4-33.9 0L106.3 240.4c-9.4 9.4-9.4 24.6 0 33.9l10.9 11c9.6 9.5 25.1 9.3 34.4-.4z" })), /*#__PURE__*/

    React.createElement("p", { id: "break-length" }, props.downtime), /*#__PURE__*/
    React.createElement("svg", {
      onClick: () => {
        if (props.paused) {
          props.setDowntime(
          props.downtime > 1 ? props.downtime - 1 : props.downtime);

        } else {
          props.setDowntime(props.downtime);
        }
      },
      id: "break-decrement",
      viewBox: "0 0 512 512",
      width: "30",
      title: "arrow-circle-down" }, /*#__PURE__*/

    React.createElement("path", { d: "M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-143.6-28.9L288 302.6V120c0-13.3-10.7-24-24-24h-16c-13.3 0-24 10.7-24 24v182.6l-72.4-75.5c-9.3-9.7-24.8-9.9-34.3-.4l-10.9 11c-9.4 9.4-9.4 24.6 0 33.9L239 404.3c9.4 9.4 24.6 9.4 33.9 0l132.7-132.7c9.4-9.4 9.4-24.6 0-33.9l-10.9-11c-9.5-9.5-25-9.3-34.3.4z" })))));




};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("content"));