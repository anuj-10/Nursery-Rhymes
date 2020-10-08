import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";

function ModalComponent({ show, videoUrl, videoPause }) {
  const [landscapeMode, setLandscapeMode] = useState(false);

  useEffect(() => {
    var vid = document.getElementById("video_player");
    if (vid) {
      videoPause ? vid.pause() : vid.play();
    }
  }, [videoPause]);

  return (
    <>
      <Modal show={show}>
        <Modal.Body>
          <video
            id="video_player"
            className={landscapeMode ? "landscape-video" : ""}
            width="100%"
            autoPlay
            controls
          >
            <source
              src={videoUrl}
              type="video/webm"
              // codecs="avc1.4d002a"
            ></source>
          </video>
          <div id="player_controls">
            <button>Exit</button>
            <button>Pause</button>
            <button onClick={() => setLandscapeMode(true)}>Fullscreen</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalComponent;
