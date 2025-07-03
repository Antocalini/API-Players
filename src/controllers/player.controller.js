import { getDB } from "../config/db.js";
import { Player } from "../models/Player.js";

const createPlayer = async (req, res) => {
  try {
    const db = getDB();
    const playerData = req.body;

    const playerExists = await Player.findOne({
      name: playerData.name,
      lastName: playerData.lastName,
      team: playerData.team,
      number: playerData.number,
    });
    if (playerExists) {
      return res
        .status(400)
        .json({ message: "Un jugador con este nombre ya existe" });
    }

    if (playerData.age < 16 || playerData.age > 45) {
      return res
        .status(400)
        .json({ message: "La edad debe estar entre 16 y 45" });
    }

    if (
      !playerData.name ||
      !playerData.lastName ||
      !playerData.age ||
      !playerData.nationality ||
      !playerData.team ||
      !playerData.number ||
      !playerData.value
    ) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos" });
    }

    const result = await Player.create({
      ...playerData,
      createdAt: new Date(),
    });

    res
      .status(201)
      .json({ message: "Jugador creado correctamente", player: result });
  } catch (err) {
    res.status(400).json({ message: "Error al crear jugador" });
  }
};

const getPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.json({ message: "Jugadores obtenidos correctamente:", players });
  } catch (err) {
    res.status(500).json({ message: "Error al obtener jugadores" });
  }
};

const getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    res.json({ message: "Jugador obtenido correctamente", player });
  } catch (err) {
    res.status(500).json({ message: "Error al obtener jugador" });
  }
};

const updatePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ message: "Jugador actualizado correctamente", player });
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar jugador" });
  }
};

const deletePlayer = async (req, res) => {
  try {
    await Player.findByIdAndDelete(req.params.id);
    res.json({ message: "Jugador eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar jugador" });
  }
};

export { createPlayer, getPlayers, getPlayerById, updatePlayer, deletePlayer };
