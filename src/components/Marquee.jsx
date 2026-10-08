const words = ['CREATIVE', 'INNOVATIVE', 'IMPACTFUL', 'TECH', 'DESIGN', 'MEDIA', 'FASHION']
export function Marquee() { return <div className="marquee"><div>{[...words, ...words].map((word, index) => <span key={`${word}-${index}`}>{word} <b>•</b></span>)}</div></div> }
