export default function Loading() {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full border-6 border-semantic-info border-t-background-soft animate-spin shadow-primary"></div>
          
          <div className="text-center">
            <h1 className="text-h2 text-semantic-info font-bold mb-2">
              Cargando
            </h1>
            <p className="text-body text-text-soft">
              Por favor espere un momento...
            </p>
          </div>
        </div>
      </div>
    );
  }