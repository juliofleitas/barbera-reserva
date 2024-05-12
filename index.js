import express from "express";
import cors from "cors";

const server = express();
server.use(express.json());
server.use(cors());

const port =process.env.PORT || 8080;

const turnos = [];

server.get("/turnos", (req, res)=> {
    res.status(200).json({success:true, message: "Get turnos correctamente",data:turnos});
})

server.post("/turnos", (req, res) => {
    const { fecha, hora, nombre, telefono } = req.body;
    if(!fecha || !hora || !nombre || !telefono){
        return res.status(400).json({success: false, message: "Body debe tener: fecha, hora, nombre, telefono"});
    }
    const index = turnos.findIndex(turno => turno.fecha == fecha && turno.hora == hora);
    if(index >= 0){
        return res.status(400).json({success:false, message: "El horarios ya esta reservado"});
    }
    const nuevoTurno = {fecha, hora, nombre, telefono};
    turnos.push(nuevoTurno);

    res.status(201).json({success: true, message:"Agendado correctamente", data:turnos});
})

server.listen(port, ()=> console.log(`Server ready! -> https://barbera-reserva.onrender.com`));
