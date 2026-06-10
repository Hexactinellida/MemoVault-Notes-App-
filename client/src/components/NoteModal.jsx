import { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14H6L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4h6v2"/>
  </svg>
)

const ImageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
)

const formatDate = (date) => {
  const d = new Date(date)
  const now = new Date()
  const diff = now - d
  if (diff < 24 * 60 * 60 * 1000) {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  return d.toLocaleDateString()
}

const NoteModal = ({ note, onClose, onSave, onDelete, onRefresh }) => {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  const hasChanged = title !== note.title || content !== note.content

  const handleSave = async () => {
    if (hasChanged) {
      await onSave(note._id, { title, content })
    }
    onClose()
  }

  const handleUploadImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const formData = new FormData()
    formData.append('image', file)
    try {
      toast.loading('Uploading image...')
      const { data } = await axios.post(`/api/note/${note._id}/images`, formData)
      toast.dismiss()
      if (data.success) {
        toast.success('Image uploaded')
        onRefresh()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.dismiss()
      toast.error(error.message)
    }
  }

  const handleDeleteImage = async (publicId) => {
    try {
      const { data } = await axios.delete(`/api/note/${note._id}/images`, {
        data: { publicId }
      })
      if (data.success) {
        toast.success('Image removed')
        onRefresh()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
      onClick={handleSave}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-xl shadow-2xl flex flex-col overflow-hidden"
        style={{ minHeight: '360px', maxHeight: '80vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Body */}
        <div className="px-6 pt-6 pb-2 flex-1 flex flex-col overflow-y-auto">
          <div className="flex items-start justify-between gap-3 mb-4">
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="flex-1 text-xl font-semibold text-gray-800 outline-none bg-transparent placeholder-gray-300"
              placeholder="Title"
            />
            <button
              onClick={() => onDelete(note._id)}
              className="text-gray-400 hover:text-red-400  mt-1 flex-shrink-0"
              title="Delete note"
            >
              <TrashIcon />
            </button>
          </div>

          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full outline-none text-sm text-gray-600 resize-none leading-relaxed bg-transparent placeholder-gray-300 flex-1"
            style={{ minHeight: '180px' }}
            placeholder="Write something..."
          />

          {note.images?.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-4">
              {note.images.map(img => (
                <div key={img._id} className="relative group">
                  <img
                    src={img.url.replace('/upload/', '/upload/w_120,h_120,c_fill/')}
                    className="w-20 h-20 object-cover rounded-xl bg-gray-50"
                  />
                  <button
                    onClick={() => handleDeleteImage(img.publicId)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 items-center justify-center hidden group-hover:flex"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="text-xs text-gray-500">{formatDate(note.lastEdited)}</p>
            <label className="cursor-pointer flex items-center gap-1.5 text-gray-500 hover:text-blue-500 ">
              <ImageIcon />
              <span className="text-xs">Add image</span>
              <input
                type="file"
                accept="image/jpeg,image/png"
                className="hidden"
                onChange={handleUploadImage}
              />
            </label>
          </div>
          <button
            onClick={handleSave}
            className="text-sm bg-blue-500 text-white px-5 py-2 rounded-xl hover:bg-blue-600  font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoteModal