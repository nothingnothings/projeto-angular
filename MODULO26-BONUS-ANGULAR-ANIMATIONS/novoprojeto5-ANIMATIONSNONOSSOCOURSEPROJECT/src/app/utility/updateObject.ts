export const updateObject = (oldObject: any, updatedValues: any) => {
    // console.log(oldObject);
    // console.log(updatedValues);
    return {
        
        ...oldObject,
        ...updatedValues
    }
};