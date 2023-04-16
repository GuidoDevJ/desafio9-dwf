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
          "https://desafio-md-10.vercel.app/thanks",
      },
      external_reference,
      notification_url:
        "https://desafio9-dwf.vercel.app/api/ipn/mercadopago",
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
