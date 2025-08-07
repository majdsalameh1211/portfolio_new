import React from "react";
import "../style/FinalProject.css";

const FinalProject = () => {
  return (
    <section id="final-project" className="projects">
      <h2 className="page-title"> Main Final Degree Project – VisoSpeak</h2>

      <div className="project-slide">
        <div className="project-card">
          <h3>VisoSpeak: Visual-Only Speech Recognition</h3>
          <p>
            <strong>VisoSpeak</strong> is a{" "}
            <strong>research-driven visual-only speech recognition system</strong>{" "}
            that reconstructs spoken sentences using only lip movements—without
            any audio input. This project was developed as part of our final degree
            requirement at ORT Braude College.

             We built upon and significantly enhanced the seminal paper by Fenghour
            et al. (2020), titled{" "}
            <em>"Lip Reading Sentences Using Deep Learning With Only Visual Cues"</em>. 
            While the original paper relied on limited viseme classes and heuristic 
            word boundary detection, we introduced several major innovations:
          </p>



          <ul className="finalproject-list">
            <li>
              🔍 <strong>Explicit Word Boundary Detection</strong> – Introduced
              &lt;sow&gt; and &lt;eow&gt; tokens to explicitly mark word boundaries.
            </li>
            <li>
              🗣️ <strong>Expanded Viseme Vocabulary</strong> – Increased from 13
              to 40+ visemes using the CMU dictionary for higher phonetic
              resolution.
            </li>
            <li>
              🧠 <strong>Transformer Model Built from Scratch</strong> – Designed
              and trained a complete Transformer-based viseme decoder from scratch.
            </li>
            <li>
              🎥 <strong>Preprocessing with MediaPipe</strong> – Replaced Dlib
              with MediaPipe FaceMesh (468 landmarks) for faster, more accurate
              lip tracking (20 FPS vs 6 FPS).
            </li>
            <li>
              🧪 <strong>Replicated and Analyzed LipNet</strong> – Re-implemented
              the LipNet architecture to understand limitations of traditional
              end-to-end lipreading systems.
            </li>
            <li>
              🗄️ <strong>Optimized Dataset Handling</strong> – Processed ~80,000
              videos from the LRS2 dataset using cloud infrastructure.
            </li>
          </ul>

          <p>
            We implemented a full-stack web application with a{" "}
            <strong>Flask backend</strong> and <strong>React + Tailwind frontend</strong>,
            supporting sentence reconstruction from silent video. Both{" "}
            <strong>Transformer</strong> and <strong>LipNet</strong> models are
            integrated into the app, which can load pretrained models from Google
            Drive.

            The project was developed entirely on <strong>Google Colab</strong>,
            utilizing <strong>SSD cloud storage via Google Drive</strong> and GPU
            acceleration (L4 and A100). We implemented RAM-buffer streaming and
            dynamic batch sizing to optimize training.
          </p>


          <p>
            <strong>Key Learning Outcomes:</strong> advanced model building (3D
            CNNs, Transformer encoders/decoders), viseme/phoneme modeling, NLP
            integration, data engineering, cloud-based training, full-stack
            deployment.
          </p>

          {/* Poster Button + Hover Preview */}
<div className="poster-container">
  <button className="btn btn-primary project-link" onClick={() => window.open("/VisoSpeak_poster.pdf", "_blank")}>
    VisoSpeak Poster
  </button>

  <div className="poster-popup">
    <iframe
      src="/VisoSpeak_poster.pdf"
      width="80%"
      height="400px"
      title="VisoSpeak Poster"
    ></iframe>
  </div>
</div>


          <a
            href="https://github.com/majdsalameh1211/VisoSpeak"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary project-link"
          >
            🔗 View GitHub Repository
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalProject;
