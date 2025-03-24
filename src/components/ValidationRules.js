
export const ValidtionRules={
    members:(value)=>{
        if(!/^[1-9]+$/.test(value)){
            return "number of memebers should be an integer"
        }

    }
}
