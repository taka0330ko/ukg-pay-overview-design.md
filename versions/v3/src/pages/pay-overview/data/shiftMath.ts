export type Interval={startMinute:number;endMinute:number};
export type ShiftRecord={id:string;date:string;scheduled:Interval;actual:Interval;breaks:(Interval&{paid:boolean})[];overtimeIntervals:Interval[]};
export function validateShift(s:ShiftRecord){
 const valid=(r:Interval)=>Number.isInteger(r.startMinute)&&Number.isInteger(r.endMinute)&&r.startMinute>=0&&r.endMinute>r.startMinute;
 if(!valid(s.actual)||!valid(s.scheduled))throw new Error(`Invalid shift range: ${s.id}`);
 for(const list of [s.breaks,s.overtimeIntervals]){const sorted=[...list].sort((a,b)=>a.startMinute-b.startMinute);sorted.forEach((r,i)=>{if(!valid(r)||r.startMinute<s.actual.startMinute||r.endMinute>s.actual.endMinute||(i>0&&r.startMinute<sorted[i-1].endMinute))throw new Error(`Invalid or overlapping interval: ${s.id}`)})}
}
export function paidMinutes(s:ShiftRecord){return s.actual.endMinute-s.actual.startMinute-s.breaks.filter(b=>!b.paid).reduce((n,b)=>n+b.endMinute-b.startMinute,0)}
export function overtimeMinutes(s:ShiftRecord){return s.overtimeIntervals.reduce((n,i)=>n+i.endMinute-i.startMinute-s.breaks.filter(b=>!b.paid).reduce((v,b)=>v+Math.max(0,Math.min(b.endMinute,i.endMinute)-Math.max(b.startMinute,i.startMinute)),0),0)}
export function splitByDate(s:ShiftRecord){const result=[];for(let offset=Math.floor(s.actual.startMinute/1440);offset*1440<s.actual.endMinute;offset++){const date=new Date(s.date+'T00:00:00Z');date.setUTCDate(date.getUTCDate()+offset);result.push({date:date.toISOString().slice(0,10),startMinute:Math.max(0,s.actual.startMinute-offset*1440),endMinute:Math.min(1440,s.actual.endMinute-offset*1440),offsetMinute:offset*1440})}return result}
