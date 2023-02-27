import { fireStore } from "lib/firestore";
let collection = fireStore.collection("order");

export class Order {
  id: string;
  ref: FirebaseFirestore.DocumentReference;
  data: FirebaseFirestore.DocumentData;
  constructor(id: string) {
    this.id = id;
    this.ref = collection.doc(id);
  }
  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data();
  }

  async push() {
    await this.ref.update(this.data);
  }

  static async createNewOrder(data) {
    const newSnap = await collection.add(data);
    const newOrder = new Order(newSnap.id);
    newOrder.data = data;
    return newOrder;
  }

  static async getAllOrdersByUserId(userId){
    let datos = []
    const res = await collection.where("userId","==",userId).get()
    if(res.empty) return {msg:"No se encontro ningun producto con este UserId"}
    res.forEach(doc=>{
      datos.push(doc.data())
    })
    return datos
  }

}
