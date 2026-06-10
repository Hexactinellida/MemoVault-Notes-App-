import { useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'

const ImageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
)

const CreateNoteModal = ({ onClose, onCreated }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCreate = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post('/api/note/create', { title, content })
      if (data.success) {
        if (image) {
          const formData = new FormData()
          formData.append('image', image)
          await axios.post(`/api/note/${data.note._id}/images`, formData)
        }
        toast.success('Note created')
        onCreated()
        onClose()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-base font-semibold mb-4 text-gray-800">New note</h2>
        <form onSubmit={handleCreate} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-0 py-1 text-base font-semibold text-gray-800 placeholder-gray-300 outline-none border-none bg-transparent"
            required
            autoFocus
          />
          <textarea
            placeholder="Write something..."
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full px-0 py-1 text-sm text-gray-600 placeholder-gray-300 outline-none border-none bg-transparent resize-none h-32 leading-relaxed"
          />

          <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
            <label className="cursor-pointer flex items-center gap-1.5 text-gray-500 hover:text-blue-500 transition-colors duration-75">
              <ImageIcon />
              <span className="text-xs">{image ? image.name : 'Add image'}</span>
              <input
                type="file"
                accept="image/jpeg,image/png"
                className="hidden"
                onChange={e => setImage(e.target.files[0])}
              />
            </label>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 text-sm text-gray-500 hover:text-gray-700 rounded-xl transition-colors duration-75"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-1.5 bg-blue-500 text-white text-sm rounded-xl hover:bg-blue-600 transition-colors duration-75 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateNoteModal