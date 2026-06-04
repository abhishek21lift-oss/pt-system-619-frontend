import { T } from './designTokens'

export const fmt = v => v>=100000?`₹${(v/100000).toFixed(1)}L`:v>=1000?`₹${(v/1000).toFixed(0)}K`:`₹${v}`
export const fmtFull = v => `₹${Number(v).toLocaleString("en-IN")}`
export const tc = t => t.includes("Abhishek")?T.gold:t.includes("Riya")?T.red:T.blue
export const phaseColor = {Accumulation:T.blue,Volume:T.purple,Cutting:T.red,Base:T.green,Recomp:T.gold}
