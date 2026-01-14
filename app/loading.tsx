export default function Loading() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
            <div className="w-24 h-1 bg-neutral-100 overflow-hidden mb-8">
                <div className="w-full h-full bg-regal-blue animate-loading"></div>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 animate-pulse">
                Loading Excellence...
            </p>
        </div>
    );
}
