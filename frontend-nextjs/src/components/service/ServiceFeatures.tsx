interface Props {
  features: string[];
  title?: string;
}

export default function ServiceFeatures({ features, title = "What's Included" }: Props) {
  if (!features || features.length === 0) return null;

  return (
    <div className="mt-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-1 rounded-full bg-primary-600" />
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {features.map((feature, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-4 rounded-xl bg-primary-50/60 border border-primary-100 hover:border-primary-200 transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700 leading-snug">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
