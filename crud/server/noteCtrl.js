const Notes = require("./noteModel")

const noteCtrl = {
    getAll : async (req, res) => {
        try {
            const notes = await Notes.find()
            res.json(notes)
        } catch {
            return res.status(500).json({msg: err.message})
        }
    },
    addNote : async (req, res) => {
        try {
            const [title, description] = req.body;
            const newNote = new Notes({
                title: title,
                description: description
            })
            await newNote.save()
            res.json(newNote)
        } catch {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteNote: async(req, res) =>{
        try {
            await Notes.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Note"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateNote: async(req, res) =>{
        try {
            const {title, content, date} = req.body;
            await Notes.findOneAndUpdate({_id: req.params.id},{
                title,
                content,
                date
            })
            res.json({msg: "Updated a Note"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getNote: async(req, res) => {
        try {
            const note = await Notes.findById(req.params.id)
            res.json(note)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

};

module.exports = noteCtrl