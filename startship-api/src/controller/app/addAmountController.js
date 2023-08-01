import { userModel } from "../../model/index.js";

export const addAmountController = async (req, res) => {
  try {
    // Get the current user
    const userId = req.user._id;
    const { amount } = req.body;

    if (amount && typeof amount === "number" && amount > 0) {
      const user = await userModel.findById(userId).exec();
      const formerAmount = user.amountinDollars;

      const updatedUser = await userModel.findOneAndUpdate(
        { _id: userId },
        { amountinDollars: formerAmount + amount },
        { new: true }
      ).exec();

      if (updatedUser) {
        res.json({
          status: true,
          message: `${(amount).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })} has been successfully added to the wallet.`,
        });
      } else {
        res.json({
          status: false,
          message: `An error occurred while adding ${amount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })} to the wallet.`,
        });
      }
    } else {
      res.json({
        status: false,
        message: 'Please enter a valid amount.',
      });
    }
  } catch (err) {
    res.json({
      status: false,
      message: 'An error occurred.',
    });
  }
};
