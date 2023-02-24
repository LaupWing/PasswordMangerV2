export const missingClass = (string?: string, prefix?: string) => {
   if(!string){
      return true
   }
   const regex = new RegExp(` ?${prefix}`, "g")
   return string.match(regex) === null
}