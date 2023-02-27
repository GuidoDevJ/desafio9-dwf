import { Order } from "models/orders";
import { createPreference } from "lib/mercadopago";
import { Product } from "models/products";
import { getProductById } from "controllers/algoliaControllers";
export const orderById = async (id: string, body, token) => {
  try {
    let product = await getProductById(id);
    if (!product) throw { msg: "El producto no existe" };
    const data = {
      product: product,
      extra_information: body,
      userId: token,
      status: "pending",
    };
    const newOrder = await Order.createNewOrder(data);
    await newOrder.pull();
    const external_reference = newOrder.id;
    const pref = await createPreference({
      items: [
        {
          title: product.title,
          description: "whatever",
          picture_url:product.images[0],
          quantity: 1,
          currency_id: "ARS",
          unit_price: product.price,
        },
      ],
      back_urls: {
        success:
          "https://console.firebase.google.com/u/0/project/md-dwf-9-cap-4/firestore/data/~2Forder~2F2a1ngNPe5demQdjkQbRN?hl=es-419",
      },
      external_reference,
      notification_url:
        "https://mercadopago-pi.vercel.app/api/webhooks/mercadopago",
    });
    return {pref,external_reference};
  } catch (error) {
    return {
      msg: error.msg,
    };
  }
};

export async function getOrderById(id){
  let order = new Order(id)
  await order.pull()
  console.log(order)
  if(order.data === undefined){
    return null
  }
  return order.data
}
