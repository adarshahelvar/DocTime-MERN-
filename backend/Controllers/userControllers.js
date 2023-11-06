import User from "../models/UserSchema.js";
import Bookings from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const updateUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to updated" });
  }
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

export const getSingleUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "No user found" });
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password"); //Select("-password") will not send password to clint which means the password is not accessable for frontend users
    res.status(200).json({
      success: true,
      message: "Users found",
      data: users,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { password, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      message: "User information found",
      data: { ...rest },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getMyAppointment = async (req, res) => {
  try {
    // Step-1: Retrieve appointment from  booking for specific user
    const bookings = await Bookings.findById({ user: req.userId });

    // Step-2: Extra doctor id's from appointment booking
    const doctorIds = bookings.map(el=> el.doctor.id)

    // Step-3: Retrieve doctors using doctor id's
    const doctors = await Doctor.find({ _id: {$in: doctorIds} }).select('-password')
    res.status(200).json({
      success: true,
      message:  'Appointments are getting',
      data: doctors
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while getting appointment data",
    });
  }
};
