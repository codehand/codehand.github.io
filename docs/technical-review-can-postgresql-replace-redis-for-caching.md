#   

## **1. Introduction**  
The blog post ["Replace Redis with PostgreSQL"](https://medium.com/@tihomir.manushev/replace-redis-with-postgresql-6c11f4666f23) by **Tihomir Manushev** explores an unconventional idea: using **PostgreSQL as a cache layer** instead of Redis.  

### **Why Should Developers Care?**  
- **Simplified architecture**: Reducing dependencies by using PostgreSQL for both database and caching.  
- **Cost efficiency**: Eliminating the need for a separate Redis instance.  
- **Consistency**: Leveraging PostgreSQL’s transactional guarantees for cached data.  

### **Quick Summary**  
The article argues that PostgreSQL’s **`NOTIFY/LISTEN`**, **temporary tables**, and **UNLOGGED tables** can mimic Redis-like caching behavior, making it a viable alternative in certain scenarios.  

---  

## **2. Key Takeaways**  

### **PostgreSQL Features for Caching**  
1. **UNLOGGED Tables**  
   - Faster writes (no WAL overhead) but volatile (data lost on crash).  
   - Example:  
     ```sql  
     CREATE UNLOGGED TABLE cache (  
         key VARCHAR PRIMARY KEY,  
         value JSONB  
     );  
     ```  

2. **Temporary Tables**  
   - Session-scoped, automatically dropped on disconnect.  
   - Useful for short-lived, session-specific caching.  

3. **NOTIFY/LISTEN for Pub/Sub**  
   - PostgreSQL supports event-driven messaging similar to Redis Pub/Sub.  
   - Example:  
     ```sql  
     -- Publisher  
     NOTIFY 'updates', '{"id": 1, "data": "new"}';  
     
     -- Subscriber  
     LISTEN 'updates';  
     ```  

4. **Row-Level TTL with Background Workers**  
   - PostgreSQL doesn’t natively support TTL, but you can emulate it with:  
     - **Scheduled jobs** (e.g., `pg_cron`).  
     - **Custom triggers** for expiration logic.  

### **When Does This Make Sense?**  
- **Low to moderate cache workloads** where latency isn’t critical.  
- **Applications already using PostgreSQL** (avoiding Redis operational overhead).  
- **Consistency-heavy use cases** where cache & DB must stay in sync.  

### **When Should You Stick with Redis?**  
- **High-throughput caching** (Redis is optimized for sub-millisecond reads).  
- **Advanced data structures** (e.g., HyperLogLog, sorted sets).  
- **Distributed caching** (Redis Cluster scales better than PostgreSQL for this).  

---  

## **3. Pros & Cons of the Blog Post**  

### **Strengths**  
✅ **Clear examples** of PostgreSQL features replacing Redis functionality.  
✅ **Good use case analysis** (when PostgreSQL caching is viable).  
✅ **Encourages simplicity** by reducing infra dependencies.  

### **Weaknesses & Missing Points**  
❌ **No performance benchmarks** (How does PostgreSQL compare to Redis in real-world latency tests?).  
❌ **Ignores Redis’s clustering capabilities** (PostgreSQL replication != Redis Cluster).  
❌ **No discussion of connection overhead** (PostgreSQL connections are heavier than Redis).  

### **Corrections/Updates**  
- PostgreSQL **`UNLOGGED` tables** are not crash-safe (the article correctly mentions this).  
- For **TTL emulation**, consider **pg_partman** for automated cleanup.  

---  

## **4. Further Insights & Related Topics**  

### **Alternative Approaches**  
- **Materialized Views** (for pre-computed query caches).  
- **PgBouncer + Redis** (hybrid approach for connection pooling + fast cache).  

### **Real-World Case Studies**  
- **GitHub’s use of Redis + MySQL**: They use Redis for ephemeral data but rely on MySQL for consistency.  
- **Discord’s early PostgreSQL caching**: They used PostgreSQL for some caching before moving to ScyllaDB/Redis.  

### **Benchmarks to Consider**  
- **Redis vs. PostgreSQL for QPS** (Redis typically handles 100K+ ops/sec, PostgreSQL ~10K-50K).  
- **Network overhead**: PostgreSQL protocol is more verbose than Redis’s RESP.  

---  

## **5. Final Verdict & Recommendations**  

### **Is This Blog Post Worth Reading?**  
✔ **Yes**, if you’re exploring ways to **reduce infrastructure complexity**.  
✔ **No**, if you need **high-performance, low-latency caching** (stick with Redis).  

### **Who Benefits Most?**  
- **Intermediate/Senior Devs** evaluating trade-offs between simplicity & performance.  
- **Startups** with moderate traffic looking to minimize services.  

### **Next Steps**  
- **Experiment**: Try caching in PostgreSQL and benchmark against Redis.  
- **Read More**:  
  - [PostgreSQL LISTEN/NOTIFY docs](https://www.postgresql.org/docs/current/sql-notify.html)  
  - [Redis vs. PostgreSQL benchmarks](https://engineering.infincia.com/2020/07/benchmarking-redis-vs-postgresql)  

---  

### **Final Thought**  
While PostgreSQL can **technically** replace Redis in some cases, **practically**, Redis remains the better choice for high-performance caching. However, for small-scale apps or those already deeply integrated with PostgreSQL, this approach can simplify architecture without major trade-offs.  

Would you use PostgreSQL as a cache? **Let’s discuss!** 🚀