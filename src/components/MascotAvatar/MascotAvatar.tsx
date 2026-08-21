import type { Mascot, CharacterMood, AvatarType } from "@/types/counter";

interface Props {
  avatar: Mascot["avatar"];
  color: string;
  size?: number;
  className?: string;
  mood?: CharacterMood;
  noClip?: boolean;
}

export function MascotAvatar({
  avatar,
  color,
  size = 40,
  className = "",
  mood = "idle",
  noClip = false,
}: Props) {
  const content = renderAvatar(avatar, color, mood);

  if (noClip) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        {content}
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={`clip-${avatar}-${mood}`}>
          <circle cx="50" cy="50" r="48" />
        </clipPath>
      </defs>
      <g clipPath={`url(#clip-${avatar}-${mood})`}>
        <circle cx="50" cy="50" r="48" fill={color} fillOpacity="0.12" />
        {content}
      </g>
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeOpacity="0.3"
      />
    </svg>
  );
}

function renderAvatar(avatar: AvatarType, color: string, mood: CharacterMood) {
  switch (avatar) {
    case "sleepy":
      return <Sleepy color={color} mood={mood} />;
    case "jaabooq":
      return <Jaabooq color={color} mood={mood} />;
    case "abu-addad":
      return <AbuAddad color={color} mood={mood} />;
    case "moallem-addood":
      return <MoallemAddood color={color} mood={mood} />;
    case "addadgy":
      return <Addadgy color={color} mood={mood} />;
  }
}

function Eyes({
  mood,
  eyeColor = "#1a1d21",
  pupilOffsetL = [0, 0],
  pupilOffsetR = [0, 0],
  eyelidClosed = false,
}: {
  mood: CharacterMood;
  eyeColor?: string;
  pupilOffsetL?: number[];
  pupilOffsetR?: number[];
  eyelidClosed?: boolean;
}) {
  const [lox, loy] = pupilOffsetL;
  const [rox, roy] = pupilOffsetR;

  const getEyeShape = () => {
    switch (mood) {
      case "bored":
        return { type: "squint" as const };
      case "decrease":
        return { type: "confused" as const };
      case "reset":
        return { type: "wide" as const };
      case "rapid":
        return { type: "wide" as const };
      case "milestone":
        return { type: "excited" as const };
      case "increase":
        return { type: "happy" as const };
      default:
        return { type: "normal" as const };
    }
  };

  const shape = getEyeShape();

  if (shape.type === "squint") {
    return (
      <>
        <path
          d="M34 50 Q40 47 46 50"
          fill="none"
          stroke={eyeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M54 50 Q60 47 66 50"
          fill="none"
          stroke={eyeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </>
    );
  }

  if (shape.type === "wide" || shape.type === "excited") {
    const pupilR = shape.type === "excited" ? 2.5 : 3;
    const pupilScale = shape.type === "excited" ? 1 : 1.2;
    return (
      <>
        <circle cx="40" cy="50" r={6} fill="white" />
        <circle cx="60" cy="50" r={6} fill="white" />
        <circle
          cx={40 + lox * pupilScale}
          cy={50 + loy * pupilScale}
          r={pupilR}
          fill={eyeColor}
        />
        <circle
          cx={60 + rox * pupilScale}
          cy={50 + roy * pupilScale}
          r={pupilR}
          fill={eyeColor}
        />
        {eyelidClosed && (
          <rect
            x="33"
            y="44"
            width="14"
            height="3"
            rx="1"
            fill={eyeColor}
            fillOpacity="0.1"
          />
        )}
      </>
    );
  }

  if (shape.type === "happy") {
    return (
      <>
        <path
          d="M34 52 Q40 46 46 52"
          fill="none"
          stroke={eyeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M54 52 Q60 46 66 52"
          fill="none"
          stroke={eyeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </>
    );
  }

  if (shape.type === "confused") {
    return (
      <>
        <circle cx="40" cy="50" r="5.5" fill="white" />
        <circle cx="60" cy="48" r="5.5" fill="white" />
        <circle cx={40 + lox} cy={50 + loy} r="3" fill={eyeColor} />
        <circle cx={60 + rox} cy={48 + roy} r="3" fill={eyeColor} />
        {/* skeptical eyebrow L raised */}
        <path
          d="M33 42 L43 39"
          fill="none"
          stroke={eyeColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    );
  }

  return (
    <>
      <circle cx="40" cy="50" r="5" fill="white" />
      <circle cx="60" cy="50" r="5" fill="white" />
      <circle cx={40 + lox} cy={50 + loy} r="2.5" fill={eyeColor} />
      <circle cx={60 + rox} cy={50 + roy} r="2.5" fill={eyeColor} />
    </>
  );
}

function Sleepy({ color, mood }: { color: string; mood: CharacterMood }) {
  const getEyes = () => {
    switch (mood) {
      case "increase":
      case "milestone":
        // waking up happy — eyes squeezed into joyful arcs
        return (
          <>
            <path
              d="M33 50 Q40 44 47 50"
              fill="none"
              stroke="#1a1d21"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M53 50 Q60 44 67 50"
              fill="none"
              stroke="#1a1d21"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </>
        );
      case "decrease":
        // tired, heavy-lidded, a little worried
        return (
          <>
            <path
              d="M33 51 L46 49"
              fill="none"
              stroke="#1a1d21"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M54 49 L67 51"
              fill="none"
              stroke="#1a1d21"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M35 44 L44 46"
              fill="none"
              stroke="#1a1d21"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.5"
            />
            <path
              d="M56 46 L65 44"
              fill="none"
              stroke="#1a1d21"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.5"
            />
          </>
        );
      case "reset":
        // startled fully awake
        return (
          <>
            <circle cx="40" cy="49" r="6" fill="white" />
            <circle cx="60" cy="49" r="6" fill="white" />
            <circle cx="40" cy="49" r="3.5" fill="#1a1d21" />
            <circle cx="60" cy="49" r="3.5" fill="#1a1d21" />
          </>
        );
      case "rapid":
        // jolted awake, nightcap flying
        return (
          <>
            <circle cx="40" cy="48" r="5.5" fill="white" />
            <circle cx="60" cy="48" r="5.5" fill="white" />
            <circle cx="40" cy="48" r="3" fill="#1a1d21" />
            <circle cx="60" cy="48" r="3" fill="#1a1d21" />
          </>
        );
      case "bored":
        // classic half-lidded droop
        return (
          <>
            <path
              d="M32 49 Q39 52 46 49 L46 51 Q39 53 32 51 Z"
              fill="#1a1d21"
            />
            <path
              d="M54 49 Q61 52 68 49 L68 51 Q61 53 54 51 Z"
              fill="#1a1d21"
            />
          </>
        );
      default:
        // fast asleep — closed, curved lash lines
        return (
          <>
            <path
              d="M33 49 Q40 52 47 49"
              fill="none"
              stroke="#1a1d21"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M53 49 Q60 52 67 49"
              fill="none"
              stroke="#1a1d21"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </>
        );
    }
  };

  const getMouth = () => {
    switch (mood) {
      case "increase":
      case "milestone":
        // big satisfied stretch-yawn
        return (
          <>
            <ellipse cx="50" cy="68" rx="10" ry="8" fill="#1a1d21" />
            <ellipse cx="50" cy="71" rx="6" ry="4" fill="#f87171" />
          </>
        );
      case "decrease":
        return (
          <path
            d="M42 68 Q50 65 58 68"
            fill="none"
            stroke="#1a1d21"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />
        );
      case "reset":
        return (
          <>
            <ellipse cx="50" cy="69" rx="6" ry="4.5" fill="#1a1d21" />
            <ellipse cx="50" cy="70" rx="3" ry="2" fill="#f87171" />
          </>
        );
      case "rapid":
        return (
          <>
            <ellipse cx="50" cy="68" rx="8" ry="6" fill="#1a1d21" />
            <ellipse cx="50" cy="70" rx="4" ry="3" fill="#f87171" />
          </>
        );
      case "bored":
        return (
          <>
            <line
              x1="44"
              y1="68"
              x2="56"
              y2="68"
              stroke="#1a1d21"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M56 69 Q58 72 56 75 Q54 72 56 69 Z"
              fill="#7dd3fc"
              fillOpacity="0.7"
            />
          </>
        );
      default:
        return (
          <path
            d="M42 67 Q50 71 58 67"
            fill="none"
            stroke="#1a1d21"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        );
    }
  };

  const capTilt =
    mood === "rapid"
      ? "rotate(-10deg)"
      : mood === "reset"
      ? "rotate(6deg)"
      : mood === "milestone"
      ? "rotate(-4deg)"
      : "none";
  const showZzz =
    mood === "increase" || mood === "bored" || mood === "decrease";

  return (
    <>
      {/* nightcap */}
      <g style={{ transformOrigin: "50px 30px", transform: capTilt }}>
        <path
          d="M28 40 Q26 14 50 12 Q60 12 62 24 Q70 22 72 32 Q74 40 66 40 Z"
          fill={color}
        />
        <circle cx="68" cy="26" r="4" fill="white" fillOpacity="0.85" />
        <rect
          x="26"
          y="36"
          width="48"
          height="6"
          rx="3"
          fill={color}
          fillOpacity="0.75"
        />
      </g>

      {/* face */}
      <ellipse cx="50" cy="55" rx="24" ry="25" fill="#fde68a" />

      {/* rosy sleepy cheeks */}
      <circle cx="32" cy="58" r="5" fill="#f87171" fillOpacity="0.25" />
      <circle cx="68" cy="58" r="5" fill="#f87171" fillOpacity="0.25" />

      {getEyes()}
      {getMouth()}

      {/* blanket/collar snuggled up to the chin */}
      <path
        d="M26 68 Q50 84 74 68 L74 78 Q50 92 26 78 Z"
        fill={color}
        fillOpacity="0.85"
      />
      <path
        d="M26 68 Q50 80 74 68"
        fill="none"
        stroke={color}
        strokeOpacity="0.5"
        strokeWidth="2"
      />

      {/* floating zzz — the lazy signature */}
      {showZzz && (
        <text
          x="68"
          y="30"
          fontSize="9"
          fill={color}
          fillOpacity="0.6"
          fontFamily="sans-serif"
          fontWeight="bold"
        >
          z z Z
        </text>
      )}

      {/* startled sparks for reset/rapid */}
      {mood === "reset" && (
        <>
          <text x="20" y="44" fontSize="6" fill="#f87171">
            !
          </text>
          <text x="72" y="42" fontSize="8" fill={color}>
            ✦
          </text>
        </>
      )}
      {mood === "rapid" && (
        <path
          d="M22 46 Q25 42 22 38"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
    </>
  );
}

function Jaabooq({ color, mood }: { color: string; mood: CharacterMood }) {
  const showEyesUnderSunglasses = mood === "reset" || mood === "milestone";

  const getMouth = () => {
    switch (mood) {
      case "increase":
      case "milestone":
        return (
          <path
            d="M42 70 Q50 75 58 69"
            fill="none"
            stroke="#1a1d21"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        );
      case "decrease":
        return (
          <path
            d="M42 70 Q50 67 58 70"
            fill="none"
            stroke="#1a1d21"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      case "reset":
        return <ellipse cx="50" cy="72" rx="6" ry="4" fill="#1a1d21" />;
      case "rapid":
        return (
          <path
            d="M43 71 Q50 68 57 71"
            fill="none"
            stroke="#1a1d21"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        );
      case "bored":
        return (
          <>
            <path
              d="M43 72 Q50 70 57 72"
              fill="none"
              stroke="#1a1d21"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <text x="64" y="56" fontSize="6" fill="#1a1d21" fillOpacity="0.5">
              z
            </text>
            <text x="70" y="48" fontSize="4" fill="#1a1d21" fillOpacity="0.4">
              Z
            </text>
          </>
        );
      default:
        return (
          <path
            d="M40 68 Q52 74 62 66"
            fill="none"
            stroke="#1a1d21"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        );
    }
  };

  return (
    <>
      {/* cool cap - tilt for rapid */}
      <g
        style={{
          transformOrigin: "50px 28px",
          transform:
            mood === "rapid"
              ? "rotate(-6deg)"
              : mood === "reset"
              ? "rotate(8deg)"
              : "none",
        }}
      >
        <path
          d="M26 38 Q26 22 50 20 Q74 22 74 38 L74 32 L26 32 Z"
          fill={color}
        />
        <rect
          x="24"
          y="34"
          width="52"
          height="5"
          rx="2"
          fill={color}
          fillOpacity="0.8"
        />
        <circle cx="50" cy="28" r="3" fill="white" fillOpacity="0.6" />
      </g>
      <ellipse cx="50" cy="55" rx="24" ry="26" fill="#fcd9b6" />

      {showEyesUnderSunglasses ? (
        <>
          {/* sunglasses lifted */}
          <g
            style={{
              transformOrigin: "50px 50px",
              transform: "translateY(-8px)",
            }}
          >
            <rect
              x="32"
              y="46"
              width="14"
              height="9"
              rx="3"
              fill="#1a1d21"
              fillOpacity="0.4"
            />
            <rect
              x="54"
              y="46"
              width="14"
              height="9"
              rx="3"
              fill="#1a1d21"
              fillOpacity="0.4"
            />
            <rect
              x="46"
              y="49"
              width="4"
              height="2"
              fill="#1a1d21"
              fillOpacity="0.4"
            />
          </g>
          <Eyes mood={mood} pupilOffsetL={[0, 0]} pupilOffsetR={[0, 0]} />
        </>
      ) : (
        <>
          {/* sunglasses on */}
          <rect x="32" y="46" width="14" height="9" rx="3" fill="#1a1d21" />
          <rect x="54" y="46" width="14" height="9" rx="3" fill="#1a1d21" />
          <rect x="46" y="49" width="4" height="2" fill="#1a1d21" />
          {/* small reflection */}
          <rect
            x="34"
            y="48"
            width="3"
            height="1.5"
            rx="0.75"
            fill="white"
            fillOpacity="0.4"
          />
          <rect
            x="56"
            y="48"
            width="3"
            height="1.5"
            rx="0.75"
            fill="white"
            fillOpacity="0.4"
          />
        </>
      )}

      {getMouth()}

      {/* suspicion sweat for decrease */}
      {mood === "decrease" && (
        <path
          d="M72 58 Q75 62 73 66 Q70 63 71 59 Z"
          fill="#60a5fa"
          fillOpacity="0.7"
        />
      )}
    </>
  );
}

function AbuAddad({ color, mood }: { color: string; mood: CharacterMood }) {
  const getMouth = () => {
    switch (mood) {
      case "increase":
      case "milestone":
        return (
          <path
            d="M44 64 Q50 68 56 64"
            fill="none"
            stroke="#1a1d21"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        );
      case "decrease":
        return (
          <path
            d="M45 65 Q50 63 55 65"
            fill="none"
            stroke="#1a1d21"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      case "reset":
        return (
          <>
            <path
              d="M42 66 Q50 63 58 66"
              fill="none"
              stroke="#1a1d21"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* small disappointment line */}
          </>
        );
      case "rapid":
        return (
          <path
            d="M44 65 Q50 64 56 65"
            fill="none"
            stroke="#1a1d21"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      case "bored":
        return (
          <path
            d="M45 66 L55 66"
            fill="none"
            stroke="#1a1d21"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      default:
        return (
          <path
            d="M45 64 Q50 66 55 64"
            fill="none"
            stroke="#1a1d21"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
    }
  };

  const browStyle =
    mood === "decrease"
      ? "skeptical"
      : mood === "reset" || mood === "milestone"
      ? "raised"
      : mood === "rapid"
      ? "concerned"
      : "normal";

  return (
    <>
      <ellipse cx="50" cy="48" rx="24" ry="24" fill="#f0c8a0" />
      {/* beard */}
      <path
        d="M28 52 Q30 78 50 80 Q70 78 72 52 Q66 68 50 68 Q34 68 28 52 Z"
        fill={color}
        fillOpacity="0.85"
      />
      {/* mustache */}
      <path
        d="M36 58 Q42 54 50 58 Q58 54 64 58 Q58 62 50 60 Q42 62 36 58 Z"
        fill={color}
      />

      {/* eyebrows */}
      {browStyle === "normal" && (
        <>
          <rect x="35" y="42" width="8" height="2" rx="1" fill={color} />
          <rect x="57" y="42" width="8" height="2" rx="1" fill={color} />
        </>
      )}
      {browStyle === "skeptical" && (
        <>
          <path
            d="M34 44 L44 40"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <rect x="57" y="42" width="8" height="2" rx="1" fill={color} />
        </>
      )}
      {browStyle === "raised" && (
        <>
          <path
            d="M34 40 L44 43"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M66 40 L56 43"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </>
      )}
      {browStyle === "concerned" && (
        <>
          <path
            d="M34 40 L44 43"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M66 43 L56 40"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}

      <Eyes mood={mood} />
      {getMouth()}
    </>
  );
}

function MoallemAddood({
  color,
  mood,
}: {
  color: string;
  mood: CharacterMood;
}) {
  const getMouth = () => {
    switch (mood) {
      case "milestone":
        return (
          <>
            <path
              d="M42 66 Q50 73 58 66"
              fill="none"
              stroke="#1a1d21"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path d="M44 67 Q50 72 56 67" fill="#f87171" fillOpacity="0.4" />
          </>
        );
      case "increase":
        return (
          <path
            d="M44 66 Q50 71 56 66"
            fill="none"
            stroke="#1a1d21"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      case "decrease":
        return (
          <path
            d="M44 67 Q50 64 56 67"
            fill="none"
            stroke="#1a1d21"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      case "reset":
        return (
          <path
            d="M42 68 Q50 63 58 68"
            fill="none"
            stroke="#1a1d21"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      case "rapid":
        return (
          <path
            d="M44 66 Q50 67 56 66"
            fill="none"
            stroke="#1a1d21"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      case "bored":
        return (
          <path
            d="M45 68 L55 68"
            fill="none"
            stroke="#1a1d21"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      default:
        return (
          <path
            d="M44 66 Q50 70 56 66"
            fill="none"
            stroke="#1a1d21"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
    }
  };

  const getEyes = () => {
    if (mood === "reset") {
      return (
        <>
          <circle cx="40" cy="52" r="4.5" fill="white" />
          <circle cx="60" cy="52" r="4.5" fill="white" />
          <circle cx="40" cy="53" r="2.5" fill="#1a1d21" />
          <circle cx="60" cy="53" r="2.5" fill="#1a1d21" />
        </>
      );
    }
    if (mood === "bored") {
      return (
        <>
          <path
            d="M36 54 L44 54"
            fill="none"
            stroke="#1a1d21"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M56 54 L64 54"
            fill="none"
            stroke="#1a1d21"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      );
    }
    return (
      <>
        <path
          d="M36 52 Q40 50 44 52"
          fill="none"
          stroke="#1a1d21"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M56 52 Q60 50 64 52"
          fill="none"
          stroke="#1a1d21"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    );
  };

  return (
    <>
      {/* wizard hat - wobble for milestone */}
      <g
        style={{
          transformOrigin: "50px 26px",
          transform:
            mood === "milestone"
              ? "rotate(-4deg)"
              : mood === "rapid"
              ? "rotate(3deg)"
              : "none",
        }}
      >
        <path d="M50 10 L72 42 L28 42 Z" fill={color} />
        <path
          d="M50 10 Q54 18 58 22"
          fill="none"
          stroke={color}
          strokeOpacity="0.5"
          strokeWidth="2"
        />
        <ellipse
          cx="50"
          cy="42"
          rx="24"
          ry="5"
          fill={color}
          fillOpacity="0.7"
        />
        <text x="46" y="32" fontSize="8" fill="white" fillOpacity="0.7">
          ★
        </text>
        {mood === "milestone" && (
          <text x="26" y="28" fontSize="7" fill="#fbbf24">
            ✨
          </text>
        )}
      </g>
      <ellipse cx="50" cy="58" rx="22" ry="24" fill="#f0c8a0" />
      <path
        d="M32 62 Q36 86 50 84 Q64 86 68 62 Q60 76 50 76 Q40 76 32 62 Z"
        fill="white"
        fillOpacity="0.9"
      />
      {getEyes()}
      {getMouth()}
    </>
  );
}

function Addadgy({ color, mood }: { color: string; mood: CharacterMood }) {
  const getMouth = () => {
    switch (mood) {
      case "increase":
      case "milestone":
      case "rapid":
        return (
          <>
            <path
              d="M41 66 Q50 74 59 66"
              fill="none"
              stroke="#1a1d21"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <rect
              x="46"
              y="67"
              width="3"
              height={mood === "milestone" || mood === "rapid" ? 5 : 4}
              rx="1"
              fill="white"
              stroke="#1a1d21"
              strokeWidth="0.5"
            />
            <rect
              x="51"
              y="67"
              width="3"
              height={mood === "milestone" || mood === "rapid" ? 5 : 4}
              rx="1"
              fill="white"
              stroke="#1a1d21"
              strokeWidth="0.5"
            />
          </>
        );
      case "decrease":
        return (
          <path
            d="M43 68 Q50 64 57 68"
            fill="none"
            stroke="#1a1d21"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      case "reset":
        return <ellipse cx="50" cy="70" rx="6" ry="3.5" fill="#1a1d21" />;
      case "bored":
        return (
          <path
            d="M44 70 L56 70"
            fill="none"
            stroke="#1a1d21"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      default:
        return (
          <>
            <path
              d="M42 66 Q50 72 58 66"
              fill="none"
              stroke="#1a1d21"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <rect
              x="46"
              y="67"
              width="3"
              height="4"
              rx="1"
              fill="white"
              stroke="#1a1d21"
              strokeWidth="0.5"
            />
            <rect
              x="51"
              y="67"
              width="3"
              height="4"
              rx="1"
              fill="white"
              stroke="#1a1d21"
              strokeWidth="0.5"
            />
          </>
        );
    }
  };

  const pupils =
    mood === "reset" || mood === "milestone" || mood === "rapid"
      ? [0, 0]
      : [0, 0];
  const widePupils = mood === "rapid" || mood === "milestone";

  return (
    <>
      {/* hair tuft - more upright for rapid */}
      <g
        style={{
          transformOrigin: "50px 28px",
          transform: mood === "rapid" ? "translateY(-3px) scaleY(1.3)" : "none",
        }}
      >
        <path d="M42 28 Q50 18 58 28 L55 32 L45 32 Z" fill={color} />
      </g>
      <ellipse cx="50" cy="55" rx="22" ry="24" fill="#fde68a" />
      {/* big round glasses - expand for excitement */}
      <g
        style={{
          transform:
            mood === "rapid" || mood === "milestone" ? "scale(1.08)" : "none",
          transformOrigin: "50px 50px",
        }}
      >
        <circle
          cx="40"
          cy="50"
          r="8"
          fill="none"
          stroke={color}
          strokeWidth={widePupils ? 3 : 2.5}
        />
        <circle
          cx="60"
          cy="50"
          r="8"
          fill="none"
          stroke={color}
          strokeWidth={widePupils ? 3 : 2.5}
        />
        <line
          x1="48"
          y1="50"
          x2="52"
          y2="50"
          stroke={color}
          strokeWidth={widePupils ? 3 : 2.5}
        />
      </g>
      {/* eyes inside glasses */}
      {mood === "bored" ? (
        <>
          <path
            d="M34 50 L46 50"
            fill="none"
            stroke="#1a1d21"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M54 50 L66 50"
            fill="none"
            stroke="#1a1d21"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <circle
            cx={40 + pupils[0]}
            cy={50}
            r={widePupils ? 3.5 : 2.5}
            fill="#1a1d21"
          />
          <circle
            cx={60 + pupils[1]}
            cy={50}
            r={widePupils ? 3.5 : 2.5}
            fill="#1a1d21"
          />
          {/* sparkle for milestone */}
          {mood === "milestone" && (
            <>
              <circle cx={39} cy={48} r="0.8" fill="white" />
              <circle cx={59} cy={48} r="0.8" fill="white" />
            </>
          )}
        </>
      )}
      {getMouth()}
      {/* loading dots for bored */}
      {mood === "bored" && (
        <g fontSize="5" fill={color} fillOpacity="0.7">
          <circle cx="68" cy="46" r="2" />
          <circle cx="73" cy="46" r="2" opacity="0.6" />
          <circle cx="78" cy="46" r="2" opacity="0.3" />
        </g>
      )}
      {/* tech sparks for rapid */}
      {mood === "rapid" && (
        <>
          <text x="68" y="44" fontSize="6" fill="#fbbf24">
            ⚡
          </text>
          <text x="24" y="50" fontSize="5" fill="#60a5fa">
            ⚡
          </text>
        </>
      )}
    </>
  );
}
