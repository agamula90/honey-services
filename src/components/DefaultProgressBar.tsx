import React, {useEffect, useState} from "react";
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";

let progressIntervalId: NodeJS.Timeout;

export default function DefaultProgressBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        progressIntervalId = setInterval(() => {
            let newProgress = progress % 100 + Math.random() * 40;
            if (progress < 100 && newProgress > 100) {
                newProgress = 100;
            }
            setProgress(newProgress);
        }, 200);

        return () => {
            clearInterval(progressIntervalId);
            progressIntervalId = null;
        }
    }, [progress]);

    return <div style={{width: 50, height: 50, marginInline: "auto", marginBlock: 10}}>
        <CircularProgressbar value={progress} styles={
            buildStyles({
                strokeLinecap: "butt",
                pathColor: `var(--link-color)`,
                backgroundColor: "red"
            })
        }/>
    </div>
}