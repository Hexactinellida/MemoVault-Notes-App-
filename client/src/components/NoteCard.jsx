const formatDate = (date) => {
  const d = new Date(date)
  const now = new Date()
  const diff = now - d
  if (diff < 24 * 60 * 60 * 1000) {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  return d.toLocaleDateString()
}

const NoteCard = ({ note, onClick }) => {
  return (
    <div
      onClick={() => onClick(note)}
      className="bg-white/90 rounded-2xl shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-75 overflow-hidden"
    >
      {note.images?.length > 0 && (
        <img
          src={note.images[0].url.replace('/upload/', '/upload/w_400,c_fit/')}
          alt="thumbnail"
          className="w-full object-contain bg-gray-50"
        />
      )}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 truncate text-sm">{note.title}</h3>
        {note.content && (
          <p className="text-gray-500 text-xs mt-1 line-clamp-3 leading-relaxed">{note.content}</p>
        )}
        <p className="text-xs text-gray-400 mt-2">{formatDate(note.lastEdited)}</p>
      </div>
    </div>
  )
}

export default NoteCard