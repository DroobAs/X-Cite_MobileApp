export const AddToUserCart = async (proId, amount, usr, db, doc, getDoc, updateDoc)=>{

    const usrdoc = doc(db, `users/${usr.uid}`);
    getDoc(usrdoc).then((res)=>{
        let data = res.data();
        data.cart.push({pId:proId, amount: parseInt(amount)})

        updateDoc(usrdoc,data)
        .then((res)=>{
            console.log(res)
        })
    }).catch((err)=>{
            console.log(err);
        })
}