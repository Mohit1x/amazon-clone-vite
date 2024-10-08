import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { BsFillCreditCardFill } from "react-icons/bs";
import { addOrder } from "../redux slices/AllProductsSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const PaymentMethod = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const total = useSelector((store) => store.products.grandTotal);
  const info = useSelector((store) => store.products.userData);

  const onSubmit = (data) => {
    console.log(data);
  };
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleOrder = () => {
    dispatch(addOrder());
    toast.success("Order Placed Successfully!");
    navigate("/orders");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-1 shadow-2xl bg-white p-10 rounded-md gap-10">
        <h1 className="text-2xl font-bold">Payment Information</h1>
        <div className="flex flex-col gap-4">
          <label className="text-md font-semibold">
            Name : <span>{info.name}</span>
          </label>
          <label className="text-md font-semibold">
            Address : {info.address}, {info.pinCode}
          </label>
          <label className="text-md font-semibold">
            Country : {info.country}
          </label>
          <label className="text-md font-semibold">
            Payment Method : {info.method}
          </label>
          <label className="text-md font-semibold">
            Total Amount : <span className="font-bold text-xl">${total}</span>
          </label>
        </div>
        {info.method === "credit/debit card" ? (
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="font-bold text-xl mb-4">Card Details</h1>
            <div className="flex justify between border border-slate-200 items-center w-full">
              <BsFillCreditCardFill className="text-xl text-gray-400 ml-2" />
              <input
                {...register("cardnumber", {
                  required: "this field is reuired",
                  minLength: { value: 19, message: "enter valid card number" },
                })}
                type="number"
                className="p-4 focus:outline-none placeholder:text-[17px] placeholder:font-medium"
                placeholder="card number"
              />
              {errors.cardnumber && (
                <p className="text-red-500">{errors.cardnumber.message}</p>
              )}
              <input
                {...register("expiredate", {
                  required: "this field is reuired",
                  minLength: {
                    value: 13,
                    message: "enter according to the format",
                  },
                })}
                type="number"
                className="p-4 focus:outline-none placeholder:text-[15px] font-medium text-end"
                placeholder="MM/YY CVV ZIP"
              />
              {errors.expiredate && (
                <p className="text-red-500">{errors.expiredate.message}</p>
              )}
            </div>
            <button
              onClick={handleOrder}
              type="submit"
              className="bg-[#FF9500] p-2 w-fit text-white rounded-md font-bold mt-4 transition duration-300 hover:scale-[1.1]"
            >
              Place Order
            </button>
          </form>
        ) : (
          <button
            onClick={handleOrder}
            className="bg-[#FF9500] p-2 w-fit text-white rounded-md font-bold transition duration-300 hover:scale-[1.1]"
          >
            Place Order
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;
