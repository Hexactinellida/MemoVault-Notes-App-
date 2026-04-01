import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'


const Home = () => {
  const navigate = useNavigate()
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  const [newNote, setNewNote] = useState({ title: '', content: '' })
  const [newNoteImage, setNewNoteImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get('/api/note/all')
      if (data.success) setNotes(data.notes)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])


  const handleCreate = async (e) => {
  e.preventDefault()
  setLoading(true)
  try {
    const { data } = await axios.post('/api/note/create', newNote)
    if (data.success) {
      if (newNoteImage) {
        const formData = new FormData()
        formData.append('image', newNoteImage)
        await axios.post(`/api/note/${data.note._id}/images`, formData)
      }
      toast.success('Note created')
      setNewNote({ title: '', content: '' })
      setNewNoteImage(null)
      setShowCreate(false)
      fetchNotes()
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  } finally {
    setLoading(false)
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

  const handleUpdate = async (note) => {
    try {
      const { data } = await axios.put(`/api/note/${note._id}`, {
        title: note.title,
        content: note.content
      })
      if (data.success) {
        fetchNotes()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleUploadImage = async (e, noteId) => {
    const file = e.target.files[0]
    if (!file) return
    const formData = new FormData()
    formData.append('image', file)
    try {
      toast.loading('Uploading image...')
      const { data } = await axios.post(`/api/note/${noteId}/images`, formData)
      toast.dismiss()
      if (data.success) {
        toast.success('Image uploaded')
        setSelectedNote(data.note)
        fetchNotes()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.dismiss()
      toast.error(error.message)
    }
  }

  const handleDeleteImage = async (noteId, publicId) => {
    try {
      const { data } = await axios.delete(`/api/note/${noteId}/images`, {
        data: { publicId }
      })
      if (data.success) {
        toast.success('Image removed')
        setSelectedNote(data.note)
        fetchNotes()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const formatDate = (date) => {
    const d = new Date(date)
    const now = new Date()
    const diff = now - d
    if (diff < 24 * 60 * 60 * 1000) {
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    return d.toLocaleDateString()
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <button
          onClick={() => setShowCreate(true)}
          className="mb-6 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium"
        >
          + New Note
        </button>

        {notes.length === 0 ? (
          <p className="text-center text-gray-400 mt-20">No notes yet. Create your first one!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {notes.map(note => (
              <div
                key={note._id}
                onClick={() => setSelectedNote({ ...note })}
                className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow cursor-pointer hover:shadow-md transition"
              >
                {note.images?.length > 0 ? (
                  <img
                    src={note.images[0].url.replace('/upload/', '/upload/w_400,h_200,c_fit/')}
                    alt="thumbnail"
                    className="w-full h-32 object-contain rounded-lg mb-3 bg-gray-50"
                  />
                ) : (
                  note.content && (
                    <p className="text-gray-400 text-xs mb-3 line-clamp-2">{note.content}</p>
                  )
                )}
                <h3 className="font-semibold text-gray-800 truncate">{note.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{formatDate(note.lastEdited)}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Note Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold mb-4">New Note</h2>
            <form onSubmit={handleCreate} className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={newNote.title}
                onChange={e => setNewNote({ ...newNote, title: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <textarea
                placeholder="Contents"
                value={newNote.content}
                onChange={e => setNewNote({ ...newNote, content: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 resize-none h-32"
              />

              <label className="cursor-pointer flex items-center gap-1 w-fit">
                <img src="/src/assets/images.png" className="w-5 h-5 opacity-60" />
                <span className="text-xs text-blue-500 hover:underline">Add Image</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  className="hidden"
                  onChange={e => setNewNoteImage(e.target.files[0])}
                />
              </label>
              {newNoteImage && (
                <p className="text-xs text-gray-400">{newNoteImage.name}</p>
              )}

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => { setShowCreate(false); setNewNoteImage(null) }}
                  className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
                      {loading ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Note Overlay */}
      {selectedNote && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          onClick={() => { handleUpdate(selectedNote); setSelectedNote(null) }}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Top bar - delete on right */}
            <div className="flex justify-end mb-3">
              <button
                onClick={() => handleDelete(selectedNote._id)}
                className="text-red-400 hover:text-red-600 transition text-sm"
              >
                Delete
              </button>
            </div>

            <input
              type="text"
              value={selectedNote.title}
              onChange={e => setSelectedNote({ ...selectedNote, title: e.target.value })}
              className="w-full text-xl font-bold outline-none mb-3 border-b pb-2"
            />
            <textarea
              value={selectedNote.content}
              onChange={e => setSelectedNote({ ...selectedNote, content: e.target.value })}
              className="w-full outline-none text-sm text-gray-700 resize-none h-48"
            />

            {/* Images */}
            <div className="mt-3">
              {selectedNote.images?.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-3">
                  {selectedNote.images.map(img => (
                    <div key={img._id} className="relative group">
                      <img
                        src={img.url.replace('/upload/', '/upload/w_100,h_100,c_fit/')}
                        className="w-20 h-20 object-contain rounded-lg bg-gray-50"
                      />
                      <button
                        onClick={() => handleDeleteImage(selectedNote._id, img.publicId)}
                        className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 items-center justify-center hidden group-hover:flex"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <label className="cursor-pointer flex items-center gap-1 w-fit">
                <img src="/src/assets/images.png" className="w-5 h-5 opacity-60" />
                <span className="text-xs text-blue-500 hover:underline">Add Image</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  className="hidden"
                  onChange={e => handleUploadImage(e, selectedNote._id)}
                />
              </label>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t">
              <p className="text-xs text-gray-400">
                Last edited: {formatDate(selectedNote.lastEdited)}
              </p>
              <button
                onClick={() => { handleUpdate(selectedNote); setSelectedNote(null) }}
                className="text-sm bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-600 transition font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home