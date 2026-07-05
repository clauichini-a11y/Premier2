import { motion } from 'motion/react';
import { MapPin, Clock, Calendar, Car, Phone, Mail } from 'lucide-react';
import { SALON_DETAILS } from '../data/salonData';

export default function Access() {
  // Simple elegant map embed representing Omotesando (the location)
  // Clean neutral overlay styled map embed
  const mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.391672325336!2d139.7077598!3d35.6648585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188ca0607d7277%3A0xc487a32432a93ffc!2z6KGo5Y-C6YGT6aeF!5e0!3m2!1sja!2sjp!4v1783242000000!5m2!1sja!2sjp';

  return (
    <section id="access" className="py-24 bg-stone-50 border-b border-stone-200/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-amber-800 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
            Access & Location
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-800 tracking-wider">
            ご来店の前に
          </h2>
          <div className="w-12 h-[1px] bg-amber-800/40 mx-auto my-4" />
          <p className="text-stone-600 text-sm leading-relaxed tracking-wider font-light">
            表参道の喧騒から一本入った、静かな小道に佇むプライベートサロンです。<br className="hidden sm:inline" />
            完全予約制のため、どうぞお時間にゆとりをもってお越しください。
          </p>
        </div>

        {/* Info & Map Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">
          {/* Left: Info Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-5/12 flex flex-col justify-between space-y-8"
          >
            {/* Salon Details List */}
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-stone-100 rounded-lg text-amber-800 mt-1 flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                    サロン所在地 (住所)
                  </h4>
                  <p className="text-sm font-serif text-stone-800 tracking-wide">
                    {SALON_DETAILS.address}
                  </p>
                  <p className="text-xs text-stone-500 leading-relaxed font-light">
                    {SALON_DETAILS.accessInfo}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-stone-100 rounded-lg text-amber-800 mt-1 flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                    営業時間
                  </h4>
                  <p className="text-sm font-serif text-stone-800 tracking-wide">
                    {SALON_DETAILS.hours}
                  </p>
                </div>
              </div>

              {/* Closed */}
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-stone-100 rounded-lg text-amber-800 mt-1 flex-shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                    定休日
                  </h4>
                  <p className="text-sm font-serif text-stone-800 tracking-wide">
                    {SALON_DETAILS.closed}
                  </p>
                </div>
              </div>

              {/* Parking */}
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-stone-100 rounded-lg text-amber-800 mt-1 flex-shrink-0">
                  <Car className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                    駐車場のご案内
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed font-light">
                    {SALON_DETAILS.parking}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Contact Box */}
            <div className="border-t border-stone-200/60 pt-6 mt-6 space-y-4">
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                お電話・お問合せ
              </h4>
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4">
                <a
                  href={`tel:${SALON_DETAILS.phone.replace(/-/g, '')}`}
                  className="flex items-center space-x-2 text-stone-700 hover:text-amber-800 text-sm font-medium transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-700" />
                  <span>{SALON_DETAILS.phone}</span>
                </a>
                <a
                  href={`mailto:${SALON_DETAILS.email}`}
                  className="flex items-center space-x-2 text-stone-700 hover:text-amber-800 text-sm font-medium transition-colors"
                >
                  <Mail className="w-4 h-4 text-amber-700" />
                  <span>{SALON_DETAILS.email}</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Map Embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-7/12 rounded-xl overflow-hidden border border-stone-200 shadow-sm relative min-h-[350px]"
          >
            <iframe
              src={mapUrl}
              className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
