// Canvas + tweaks wiring for the camp poster exploration.

function PosterApp() {
  const [tw, setTweak] = useTweaks({
    tone: "paper",
    voice: "signage",
    energy: "bright",
    lead: "tri",
    subline: "camp",
    world: "spectrum",
    motion: "on",
  });

  return (
    <React.Fragment>
      <DesignCanvas>
        <DCSection id="print" title="Print — Letter 8.5×11" subtitle="Three concepts · same details, different lead">
          <DCArtboard id="signage" label="A · Signage type" width={850} height={1100}>
            <PosterSignage tw={tw} />
          </DCArtboard>
          <DCArtboard id="sessions" label="B · Three sessions" width={850} height={1100}>
            <PosterSessions tw={tw} />
          </DCArtboard>
          <DCArtboard id="diagram" label="C · Field diagram" width={850} height={1100}>
            <PosterDiagram tw={tw} />
          </DCArtboard>
        </DCSection>
        <DCSection id="risky" title="Risky — pushed further" subtitle="The motifs taken to their extreme · D moves, E + F print">
          <DCArtboard id="mosh" label="D · Dropped keyframe" width={850} height={1100}>
            <PosterMosh tw={tw} />
          </DCArtboard>
          <DCArtboard id="tokens" label="E · Token wall" width={850} height={1100}>
            <PosterTokens tw={tw} />
          </DCArtboard>
          <DCArtboard id="dissolve" label="F · Still resolving" width={850} height={1100}>
            <PosterDissolve tw={tw} />
          </DCArtboard>
        </DCSection>
        <DCSection id="riskier" title="Riskier — round 2" subtitle="G temperature ladder · H slit-scan (moves) · I raw signal (moves)">
          <DCArtboard id="temperature" label="G · Temperature" width={850} height={1100}>
            <PosterTemperature tw={tw} />
          </DCArtboard>
          <DCArtboard id="slitscan" label="H · Slit-scan" width={850} height={1100}>
            <PosterSlitscan tw={tw} />
          </DCArtboard>
          <DCArtboard id="signal" label="I · Raw signal" width={850} height={1100}>
            <PosterSignal tw={tw} />
          </DCArtboard>
        </DCSection>
        <DCSection id="offgrid" title="Round 3 — off the grid" subtitle="New typefaces, new layouts · J acid brutalist · K terminal (moves) · L zine (moves)">
          <DCArtboard id="brutalist" label="J · Acid brutalist" width={850} height={1100}>
            <PosterBrutalist tw={tw} />
          </DCArtboard>
          <DCArtboard id="terminal" label="K · Terminal" width={850} height={1100}>
            <PosterTerminal tw={tw} />
          </DCArtboard>
          <DCArtboard id="zine" label="L · Zine chaos" width={850} height={1100}>
            <PosterZine tw={tw} />
          </DCArtboard>
        </DCSection>
        <DCSection id="social" title="Social" subtitle="Square (Instagram) + story (9:16)">
          <DCArtboard id="square" label="Square 1080" width={1080} height={1080}>
            <PosterSquare tw={tw} />
          </DCArtboard>
          <DCArtboard id="story" label="Story 1080×1920" width={1080} height={1920}>
            <PosterStory tw={tw} />
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Color">
          <TweakRadio label="World" value={tw.world} onChange={(v) => setTweak("world", v)}
            options={[{ value: "field", label: "Field" }, { value: "spectrum", label: "Spectrum" }]} />
          <TweakRadio label="Motion (social)" value={tw.motion} onChange={(v) => setTweak("motion", v)}
            options={[{ value: "on", label: "On" }, { value: "off", label: "Off" }]} />
          <TweakRadio label="Tone" value={tw.tone} onChange={(v) => setTweak("tone", v)}
            options={[{ value: "paper", label: "Paper" }, { value: "white", label: "White" }, { value: "slate", label: "Slate" }]} />
          <TweakRadio label="Ink energy" value={tw.energy} onChange={(v) => setTweak("energy", v)}
            options={[{ value: "printed", label: "Printed" }, { value: "bright", label: "Bright" }]} />
          <TweakSelect label="Title ink (A + square)" value={tw.lead} onChange={(v) => setTweak("lead", v)}
            options={[
              { value: "tri", label: "Ink (neutral)" },
              { value: "text", label: "Text blue" },
              { value: "image", label: "Image rust" },
              { value: "video", label: "Video green" },
              { value: "cross", label: "Cross violet" },
            ]} />
        </TweakSection>
        <TweakSection label="Type & copy">
          <TweakRadio label="Type voice" value={tw.voice} onChange={(v) => setTweak("voice", v)}
            options={[{ value: "signage", label: "Signage" }, { value: "field", label: "Field serif" }]} />
          <TweakSelect label="Subline" value={tw.subline} onChange={(v) => setTweak("subline", v)}
            options={[
              { value: "camp", label: "Free creative AI camp…" },
              { value: "investigation", label: "An investigation, not a tutorial…" },
              { value: "question", label: "How do machines write, imagine…" },
            ]} />
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<PosterApp />);
