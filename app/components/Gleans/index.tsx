import React from "react";

import GleanCard from "./GleanCard";
import { getAllGleans } from "../../services/gleans.service";

const Gleans = async () => {
  const gleans = await getAllGleans();

  return (
    <div className="flex flex-col items-start justify-center gap-4 p-4">
      {gleans.map((glean) => (
        <GleanCard key={glean.id} glean={glean} />
      ))}
    </div>
  );
};

export default Gleans;
