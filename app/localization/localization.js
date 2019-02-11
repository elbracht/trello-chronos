export default function localization() {
  return {
    localization: {
      defaultLocale: 'en',
      supportedLocales: ['en', 'de'],
      resourceUrl: './strings/{locale}.json',
    },
  };
}
