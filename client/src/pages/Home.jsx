import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import NoteCard from '../components/NoteCard'
import NoteModal from '../components/NoteModal'
import CreateNoteModal from '../components/CreateNoteModal'

const Home = () => {
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)
  const [showCreate, setShowCreate] = useState(false)

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get('/api/note/all')
      if (data.success) setNotes(data.notes)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => { fetchNotes() }, [])

  const handleSave = async (id, { title, content }) => {
    try {
      const { data } = await axios.put(`/api/note/${id}`, { title, content })
      if (data.success) fetchNotes()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/note/${id}`)
      if (data.success) {
        toast.success('Note deleted')
        setSelectedNote(null)
        fetchNotes()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex-1 flex flex-col px-4">
      <div className="max-w-5xl w-full mx-auto py-8">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setShowCreate(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors duration-100 text-sm font-semibold flex items-center gap-2"
          >
            <span className="text-base leading-none">+</span> New Note
          </button>
          {notes.length > 0 && (
            <p className="text-xs text-gray-400">{notes.length} note{notes.length !== 1 ? 's' : ''}</p>
          )}
        </div>

        {/* Notes grid */}
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-28 text-center">
            <p className="text-gray-400 text-sm">No notes yet.</p>
            <p className="text-gray-300 text-xs mt-1">Hit <span className="font-medium text-gray-400">+ New Note</span> to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {notes.map(note => (
              <NoteCard
                key={note._id}
                note={note}
                onClick={setSelectedNote}
              />
            ))}
          </div>
        )}
      </div>

      {showCreate && (
        <CreateNoteModal
          onClose={() => setShowCreate(false)}
          onCreated={fetchNotes}
        />
      )}

      {selectedNote && (
        <NoteModal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onSave={handleSave}
          onDelete={handleDelete}
          onRefresh={fetchNotes}
        />
      )}
    </div>
  )
}

export default Home