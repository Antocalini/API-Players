import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "El apellido es requerido"],
    },
    nationality: {
      type: String,
      required: true,
    },
    team: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: [16, "La edad mínima es 16"],
      max: [45, "La edad máxima es 45"],
    },
    number: {
      type: Number,
      min: [1, "El número mínimo es 1"],
      max: [99, "El número máximo es 99"],
    },
    value: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Player = mongoose.model("Player", playerSchema);
